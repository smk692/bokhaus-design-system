/**
 * Button Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 */

import React from 'react';
import { Button as PaperButton, ButtonProps as PaperButtonProps } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';
import { customSpacing, customTypography } from '../../build/react-native/theme';

export interface ButtonProps extends Omit<PaperButtonProps, 'mode'> {
  /**
   * 버튼 변형
   * - filled: 주요 액션 (기본)
   * - outlined: 보조 액션
   * - text: 텍스트 버튼 (최소 사용)
   */
  variant?: 'filled' | 'outlined' | 'text';
  
  /**
   * 버튼 크기
   * - medium: 48×48px (최소 터치 영역)
   * - large: 56×56px (시니어 모드 권장)
   * @default 'medium'
   */
  size?: 'medium' | 'large';
  
  /**
   * 전체 너비 버튼
   * @default false
   */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'medium',
  fullWidth = false,
  style,
  contentStyle,
  labelStyle,
  children,
  disabled,
  ...props
}) => {
  // variant → Paper mode 매핑
  const paperMode = variant === 'filled' ? 'contained' : 
                   variant === 'outlined' ? 'outlined' : 
                   'text';

  // 크기별 터치 영역
  const touchSize = size === 'large'
    ? customSpacing.spacingTouchRecommended // 56px
    : customSpacing.spacingTouchMin;        // 48px

  const buttonStyles: ViewStyle[] = [
    styles.base,
    ...(fullWidth ? [styles.fullWidth] : []),
    ...(disabled ? [styles.disabled] : []),
    ...(style ? [style as ViewStyle] : []),
  ];

  const buttonContentStyle: ViewStyle = {
    minHeight: touchSize,
    paddingVertical: 12,
    paddingHorizontal: 24,
    ...(contentStyle as ViewStyle || {}),
  };

  const buttonLabelStyle = {
    fontSize: customTypography.typographyFontSizeButton, // 16px
    fontWeight: '600' as const, // semibold
    lineHeight: customTypography.typographyFontSizeButton * customTypography.typographyLineHeightTight, // 16
    ...(labelStyle && typeof labelStyle === 'object' ? labelStyle : {}),
  };

  return (
    <PaperButton
      mode={paperMode}
      disabled={disabled}
      style={buttonStyles}
      contentStyle={buttonContentStyle}
      labelStyle={buttonLabelStyle}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4, // CPO 요구사항: 40% 투명도
  },
});

export default Button;
