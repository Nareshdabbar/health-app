import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { createGlucoseChartStyles } from './GlucoseChart.styles';

export interface GlucosePoint {
  time: string;
  value: number;
  label?: string;
  isSpike?: boolean;
}

export interface GlucoseChartProps {
  currentValue: number;
  points?: GlucosePoint[];
}

const DEFAULT_POINTS: GlucosePoint[] = [
  { time: '06:00', value: 92 },
  { time: '08:30', value: 124, isSpike: true },
  { time: '11:00', value: 98 },
  { time: '13:30', value: 118, isSpike: true },
  { time: '14:45', value: 104 },
  { time: 'Now', value: 108 },
];

export const GlucoseChart: React.FC<GlucoseChartProps> = ({
  currentValue,
  points = DEFAULT_POINTS,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createGlucoseChartStyles(tokens), [tokens]);

  const displayPoints = useMemo(() => {
    return points.map((p) => (p.time === 'Now' ? { ...p, value: currentValue } : p));
  }, [points, currentValue]);

  // Normalization range: 60 to 160 mg/dL for height
  const minVal = 60;
  const maxVal = 160;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.targetZoneLabel}>GLYCEMIC CORRIDOR (70 – 140 mg/dL)</Text>
        <Text style={styles.rangeText}>Normal Range</Text>
      </View>

      <View style={styles.chartArea}>
        {/* Shaded Target Corridor Background (React Native View) */}
        <View style={styles.corridorBackground}>
          <Text style={styles.corridorTag}>TARGET ZONE</Text>
        </View>

        {/* Dynamic Telemetry Bars representing continuous glucose readings */}
        <View style={styles.barsContainer}>
          {displayPoints.map((pt, index) => {
            const isCurrent = index === displayPoints.length - 1;
            // Height proportional to glucose value
            const normalized = Math.min(1, Math.max(0.15, (pt.value - minVal) / (maxVal - minVal)));
            const barHeight = Math.round(normalized * 50);

            return (
              <View key={`${pt.time}-${index}`} style={styles.pointColumn}>
                <Text style={styles.pointValueText}>{pt.value}</Text>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      { height: barHeight },
                      pt.isSpike && styles.spikeBar,
                      isCurrent && styles.currentBar,
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.timeLabelText,
                    isCurrent && styles.currentTimeText,
                  ]}
                >
                  {pt.time}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
