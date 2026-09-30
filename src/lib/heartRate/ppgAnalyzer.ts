// src/lib/heartRate/ppgAnalyzer.ts

export interface RgbSample {
  timestamp: number;
  red: number;
  green: number;
  blue: number;
}

export interface HeartRateResult {
  bpm: number | null;
  confidence: number;
}

const MIN_BPM = 45;
const MAX_BPM = 180;

const MIN_FREQUENCY = MIN_BPM / 60;
const MAX_FREQUENCY = MAX_BPM / 60;

const MIN_SAMPLES = 8;

const mean = (values: number[]): number => {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const standardDeviation = (values: number[]): number => {
  if (values.length < 2) {
    return 0;
  }

  const average = mean(values);

  const variance =
    values.reduce((sum, value) => {
      const difference = value - average;
      return sum + difference * difference;
    }, 0) / values.length;

  return Math.sqrt(variance);
};

const detrend = (values: number[]): number[] => {
  if (values.length < 2) {
    return values;
  }

  const first = values[0];
  const last = values[values.length - 1];

  return values.map((value, index) => {
    const progress = index / (values.length - 1);
    const trend = first + (last - first) * progress;

    return value - trend;
  });
};

const smooth = (values: number[], windowSize = 3): number[] => {
  if (values.length < windowSize) {
    return values;
  }

  return values.map((_, index) => {
    const start = Math.max(0, index - Math.floor(windowSize / 2));
    const end = Math.min(
      values.length,
      index + Math.floor(windowSize / 2) + 1,
    );

    return mean(values.slice(start, end));
  });
};

const estimateSamplingRate = (samples: RgbSample[]): number => {
  if (samples.length < 2) {
    return 0;
  }

  const elapsed =
    (samples[samples.length - 1].timestamp - samples[0].timestamp) / 1000;

  if (elapsed <= 0) {
    return 0;
  }

  return (samples.length - 1) / elapsed;
};

const calculateAutocorrelation = (
  signal: number[],
  lag: number,
): number => {
  if (lag >= signal.length) {
    return 0;
  }

  let numerator = 0;
  let denominator = 0;

  for (let index = lag; index < signal.length; index += 1) {
    numerator += signal[index] * signal[index - lag];
  }

  for (const value of signal) {
    denominator += value * value;
  }

  if (denominator === 0) {
    return 0;
  }

  return numerator / denominator;
};

export const analyzePpgSamples = (
  samples: RgbSample[],
): HeartRateResult => {
  if (samples.length < MIN_SAMPLES) {
    return {
      bpm: null,
      confidence: 0,
    };
  }

  const samplingRate = estimateSamplingRate(samples);

  if (samplingRate <= 0) {
    return {
      bpm: null,
      confidence: 0,
    };
  }

  const greenSignal = samples.map((sample) => sample.green);

  const average = mean(greenSignal);

  if (average <= 0) {
    return {
      bpm: null,
      confidence: 0,
    };
  }

  const normalizedSignal = greenSignal.map(
    (value) => (value - average) / average,
  );

  const detrendedSignal = detrend(normalizedSignal);
  const signal = smooth(detrendedSignal, 3);

  const deviation = standardDeviation(signal);

  if (deviation < 0.0005) {
    return {
      bpm: null,
      confidence: 0,
    };
  }

  const minLag = Math.max(
    1,
    Math.floor(samplingRate / MAX_FREQUENCY),
  );

  const maxLag = Math.min(
    signal.length - 2,
    Math.ceil(samplingRate / MIN_FREQUENCY),
  );

  if (minLag >= maxLag) {
    return {
      bpm: null,
      confidence: 0,
    };
  }

  let bestLag = -1;
  let bestCorrelation = -Infinity;

  for (let lag = minLag; lag <= maxLag; lag += 1) {
    const correlation = calculateAutocorrelation(signal, lag);

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestLag = lag;
    }
  }

  if (bestLag < 1 || !Number.isFinite(bestCorrelation)) {
    return {
      bpm: null,
      confidence: 0,
    };
  }

  const frequency = samplingRate / bestLag;
  const bpm = Math.round(frequency * 60);

  if (bpm < MIN_BPM || bpm > MAX_BPM) {
    return {
      bpm: null,
      confidence: 0,
    };
  }

  const confidence = Math.max(
    0,
    Math.min(1, (bestCorrelation - 0.2) / 0.7),
  );

  return {
    bpm,
    confidence,
  };
};