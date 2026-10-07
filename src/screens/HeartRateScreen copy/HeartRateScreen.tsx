
// src/screens/HeartRateScreen/HeartRateScreen.tsx

import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import jpeg from "jpeg-js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { analyzePpgSamples, type RgbSample } from "../../lib/heartRate/ppgAnalyzer";
import { useTheme } from "../../theme/ThemeContext";
import { createHeartRateScreenStyles } from "./HeartRateScreen.styles";

export interface HeartRateScreenProps {
  onStartMeasurement?: () => void;
}

const MEASUREMENT_DURATION_MS = 12000;
const CAPTURE_INTERVAL_MS = 250;
const JPEG_QUALITY = 0.15;

const MIN_SAMPLES_FOR_RESULT = 20;
const MIN_CONFIDENCE = 0.25;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const extractRgbSample = (
  base64: string,
  timestamp: number,
): RgbSample | null => {
  try {
    const binaryString = globalThis.atob(base64);
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);

    for (let index = 0; index < binaryLength; index += 1) {
      bytes[index] = binaryString.charCodeAt(index);
    }

    const decoded = jpeg.decode(bytes, {
      useTArray: true,
      formatAsRGBA: true,
    });

    if (
      !decoded ||
      !decoded.data ||
      decoded.width <= 0 ||
      decoded.height <= 0
    ) {
      return null;
    }

    const { data, width, height } = decoded;

    /*
     * Use the central part of the image.
     *
     * When the fingertip completely covers the rear camera,
     * this region should contain the strongest transmitted-light
     * signal from the finger.
     */
    const startX = Math.floor(width * 0.25);
    const endX = Math.ceil(width * 0.75);
    const startY = Math.floor(height * 0.25);
    const endY = Math.ceil(height * 0.75);

    let redSum = 0;
    let greenSum = 0;
    let blueSum = 0;
    let pixelCount = 0;

    /*
     * Sampling every 4th pixel keeps processing manageable while
     * still giving us a large representative ROI.
     */
    for (let y = startY; y < endY; y += 4) {
      for (let x = startX; x < endX; x += 4) {
        const offset = (y * width + x) * 4;

        redSum += data[offset];
        greenSum += data[offset + 1];
        blueSum += data[offset + 2];

        pixelCount += 1;
      }
    }

    if (pixelCount === 0) {
      return null;
    }

    return {
      timestamp,
      red: redSum / pixelCount,
      green: greenSum / pixelCount,
      blue: blueSum / pixelCount,
    };
  } catch {
    return null;
  }
};

export const HeartRateScreen: React.FC<HeartRateScreenProps> = ({
  onStartMeasurement,
}) => {
  const { tokens } = useTheme();
  const styles = createHeartRateScreenStyles(tokens);

  const [permission, requestPermission] = useCameraPermissions();

  const [isMeasuring, setIsMeasuring] = useState(false);
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [measurementMessage, setMeasurementMessage] = useState(
    "Waiting for measurement",
  );

  const cameraRef = useRef<CameraView>(null);
  const mountedRef = useRef(true);
  const measuringRef = useRef(false);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      measuringRef.current = false;
    };
  }, []);

  const measureHeartRate = useCallback(async () => {
    if (!cameraRef.current || measuringRef.current) {
      return;
    }

    measuringRef.current = true;

    if (mountedRef.current) {
      setIsMeasuring(true);
      setHeartRate(null);
      setMeasurementMessage("Preparing camera signal...");
    }

    onStartMeasurement?.();

    const samples: RgbSample[] = [];
    const measurementStart = Date.now();

    try {
      /*
       * Give the camera/torch a moment to stabilize before
       * collecting the PPG signal.
       */
      await sleep(1000);

      while (
        mountedRef.current &&
        measuringRef.current &&
        Date.now() - measurementStart < MEASUREMENT_DURATION_MS
      ) {
        const captureStart = Date.now();

        try {
          const picture = await cameraRef.current.takePictureAsync({
            base64: true,
            quality: JPEG_QUALITY,
          });

          if (
            picture?.base64 &&
            mountedRef.current &&
            measuringRef.current
          ) {
            const sample = extractRgbSample(
              picture.base64,
              Date.now(),
            );

            if (sample) {
              samples.push(sample);

              if (mountedRef.current) {
                setMeasurementMessage(
                  `Analyzing pulse signal... ${Math.min(
                    100,
                    Math.round(
                      ((Date.now() - measurementStart) /
                        MEASUREMENT_DURATION_MS) *
                        100,
                    ),
                  )}%`,
                );
              }
            }
          }
        } catch {
          // Individual camera frames can fail; continue collecting.
        }

        const elapsed = Date.now() - captureStart;
        const remaining = Math.max(
          0,
          CAPTURE_INTERVAL_MS - elapsed,
        );

        if (remaining > 0) {
          await sleep(remaining);
        }
      }

      if (!mountedRef.current) {
        return;
      }

      if (samples.length < MIN_SAMPLES_FOR_RESULT) {
        setHeartRate(null);
        setMeasurementMessage(
          "Not enough camera data. Cover the camera and flash completely and try again.",
        );
        return;
      }

      const result = analyzePpgSamples(samples);

      if (
        result.bpm === null ||
        result.confidence < MIN_CONFIDENCE
      ) {
        setHeartRate(null);
        setMeasurementMessage(
          "Pulse signal was too weak. Keep your finger still and cover the camera and flash completely.",
        );
        return;
      }

      setHeartRate(result.bpm);
      setMeasurementMessage(
        `Measurement complete • ${Math.round(
          result.confidence * 100,
        )}% signal confidence`,
      );
    } finally {
      measuringRef.current = false;

      if (mountedRef.current) {
        setIsMeasuring(false);
      }
    }
  }, [onStartMeasurement]);

  const handleStartMeasurement = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();

      if (!result.granted) {
        return;
      }

      /*
       * Permission was just granted. The camera component may need
       * a render cycle before its ref is available.
       */
      await sleep(300);
    }

    await measureHeartRate();
  };

  if (!permission) {
    return (
      <View style={styles.safeArea}>
        <View style={styles.content}>
          <ActivityIndicator
            size="large"
            color={tokens.colors.primary}
          />
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Heart Rate</Text>
            <Text style={styles.subtitle}>
              Camera PPG measurement
            </Text>
          </View>

          <View style={styles.cameraCard}>
            <View style={styles.cameraPlaceholder}>
              <View style={styles.cameraIconCircle}>
                <Ionicons
                  name="camera-outline"
                  size={30}
                  color={tokens.colors.primary}
                />
              </View>

              <Text style={styles.cameraTitle}>
                Camera access required
              </Text>

              <Text style={styles.cameraText}>
                MetaHealth needs access to your rear camera to measure
                your heart rate using camera-based PPG.
              </Text>

              <TouchableOpacity
                style={styles.startButton}
                onPress={requestPermission}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="camera-outline"
                  size={19}
                  color={tokens.colors.white}
                />

                <Text style={styles.startButtonText}>
                  Allow Camera
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Heart Rate</Text>

          <Text style={styles.subtitle}>
            Camera PPG measurement
          </Text>
        </View>

        <View style={styles.cameraCard}>
          <View style={styles.cameraPreviewContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.cameraPreview}
              facing="back"
              enableTorch={isMeasuring}
            />

            <View style={styles.fingerGuide}>
              <View style={styles.fingerGuideCornerTopLeft} />
              <View style={styles.fingerGuideCornerTopRight} />
              <View style={styles.fingerGuideCornerBottomLeft} />
              <View style={styles.fingerGuideCornerBottomRight} />

              <Ionicons
                name="finger-print-outline"
                size={42}
                color={tokens.colors.white}
              />

              <Text style={styles.fingerGuideTitle}>
                {isMeasuring
                  ? "Keep your finger still"
                  : "Place finger over camera"}
              </Text>

              <Text style={styles.fingerGuideText}>
                Cover the rear camera and flash completely
              </Text>
            </View>

            {isMeasuring && (
              <View style={styles.measuringBadge}>
                <View style={styles.measuringDot} />

                <Text style={styles.measuringText}>
                  MEASURING
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusTitleRow}>
              <View style={styles.statusIconCircle}>
                <Ionicons
                  name="heart-outline"
                  size={18}
                  color={tokens.colors.primary}
                />
              </View>

              <View>
                <Text style={styles.statusTitle}>
                  CURRENT READING
                </Text>

                <Text style={styles.statusSubtitle}>
                  {measurementMessage}
                </Text>
              </View>
            </View>

            <View style={styles.readyBadge}>
              <View style={styles.readyDot} />

              <Text style={styles.readyText}>
                {isMeasuring
                  ? "LIVE"
                  : heartRate !== null
                    ? "RESULT"
                    : "READY"}
              </Text>
            </View>
          </View>

          <View style={styles.readingRow}>
            <Text style={styles.readingValue}>
              {heartRate ?? "--"}
            </Text>

            <Text style={styles.readingUnit}>BPM</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={tokens.colors.primary}
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              For a better reading
            </Text>

            <Text style={styles.infoText}>
              Sit still, relax your hand, and fully cover the rear
              camera lens and flash with your fingertip. Keep your
              finger still for the entire measurement.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartMeasurement}
          activeOpacity={0.8}
          disabled={isMeasuring}
        >
          <Ionicons
            name={
              isMeasuring
                ? "pulse-outline"
                : "heart-outline"
            }
            size={19}
            color={tokens.colors.white}
          />

          <Text style={styles.startButtonText}>
            {isMeasuring
              ? "Measuring..."
              : heartRate !== null
                ? "Measure Again"
                : "Start Measurement"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
