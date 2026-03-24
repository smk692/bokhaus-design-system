/**
 * Spinner Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 * 
 * 원형 스피너 (무한 로딩)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { customColors, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';

export interface SpinnerProps {
  /**
   * 크기
   * - small: 24px
   * - medium: 40px
   * - large: 56px
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 스피너 색상
   * @default color.primary.main
   */
  color?: string;
  
  /**
   * 로딩 텍스트 (시니어 UX 권장)
   */
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = customColors.colorPrimaryDefault,
  label,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 24;
      case 'large': return 56;
      default: return 40;
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={getSize()}
        color={color}
        accessibilityLabel={label || '로딩 중'}
        importantForAccessibility="yes"
      />
      {label && (
        <Typography
          variant="body"
          color="secondary"
          align="center"
          style={styles.label}
        >
          {label}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 12,
    fontSize: customTypography.typographyFontSizeBody, // 16px
  },
});

export default Spinner;
