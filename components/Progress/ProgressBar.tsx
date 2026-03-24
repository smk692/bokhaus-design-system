/**
 * ProgressBar Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 * 
 * 가로 진행 바 (0~100%)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar as PaperProgressBar } from 'react-native-paper';
import { customColors, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';

export interface ProgressBarProps {
  /**
   * 진행률 (0~100, 없으면 indeterminate)
   */
  value?: number;
  
  /**
   * 진행률 텍스트 레이블
   */
  label?: string;
  
  /**
   * 퍼센트 숫자 표시
   * @default false
   */
  showValue?: boolean;
  
  /**
   * 진행 바 색상
   * @default color.primary.main
   */
  color?: string;
  
  /**
   * 높이
   * @default 8px
   */
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValue = false,
  color = customColors.colorPrimaryDefault,
  height = 8,
}) => {
  const progress = value !== undefined ? value / 100 : undefined;

  return (
    <View style={styles.container}>
      {/* 레이블 + 퍼센트 */}
      {(label || showValue) && (
        <View style={styles.labelRow}>
          {label && (
            <Typography variant="body" color="secondary" style={styles.label}>
              {label}
            </Typography>
          )}
          {showValue && value !== undefined && (
            <Typography variant="body" color="primary" weight="semibold">
              {Math.round(value)}%
            </Typography>
          )}
        </View>
      )}

      {/* 진행 바 */}
      <PaperProgressBar
        progress={progress}
        color={color}
        style={[styles.bar, { height }]}
        accessibilityRole="progressbar"
        accessibilityValue={
          value !== undefined
            ? { min: 0, max: 100, now: value }
            : undefined
        }
        accessibilityLabel={label || '진행 중'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    flex: 1,
  },
  bar: {
    borderRadius: 4,
    backgroundColor: customColors.colorNeutralLight,
  },
});

export default ProgressBar;
