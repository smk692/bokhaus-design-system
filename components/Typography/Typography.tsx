/**
 * Typography Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화 - Noto Sans KR
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { customTypography, customColors } from '../../build/react-native/theme';

export type TypographyVariant = 
  | 'display'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bodyLarge'
  | 'body'
  | 'caption'
  | 'button';

export type TypographyColor = 
  | 'primary'
  | 'secondary'
  | 'disabled'
  | 'error'
  | 'success'
  | 'warning';

export interface TypographyProps extends RNTextProps {
  /**
   * 타이포그래피 변형
   * - display: 32px, 메인 타이틀
   * - heading1: 28px, 페이지 제목
   * - heading2: 24px, 섹션 제목
   * - heading3: 20px, 서브 섹션
   * - bodyLarge: 18px, 중요 본문 (시니어 권장)
   * - body: 16px, 일반 본문 (최소값)
   * - caption: 14px, 부가 정보
   * - button: 16px, 버튼 레이블
   * @default 'body'
   */
  variant?: TypographyVariant;
  
  /**
   * 텍스트 색상
   * @default 'primary'
   */
  color?: TypographyColor;
  
  /**
   * 굵기 (폰트 무게)
   * - regular: 400
   * - semibold: 600
   * - bold: 700
   */
  weight?: 'regular' | 'semibold' | 'bold';
  
  /**
   * 줄간격 오버라이드
   */
  lineHeight?: number;
  
  /**
   * 정렬
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  
  /**
   * 자식 요소
   */
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  weight,
  lineHeight,
  align = 'left',
  style,
  children,
  ...props
}) => {
  // 변형별 기본 스타일
  const variantStyle = getVariantStyle(variant);
  
  // 색상 매핑
  const textColor = getColorValue(color);
  
  // 폰트 무게
  const fontWeight = weight ? getFontWeight(weight) : variantStyle.fontWeight;
  
  // 줄간격 (커스텀 또는 기본값)
  const textLineHeight = lineHeight || variantStyle.lineHeight;

  const combinedStyle = [
    styles.base,
    variantStyle,
    {
      color: textColor,
      fontWeight,
      lineHeight: textLineHeight,
      textAlign: align,
    },
    style,
  ];

  return (
    <RNText style={combinedStyle} {...props}>
      {children}
    </RNText>
  );
};

// 변형별 스타일 매핑
function getVariantStyle(variant: TypographyVariant) {
  switch (variant) {
    case 'display':
      return {
        fontSize: customTypography.typographyFontSizeDisplay, // 32
        fontWeight: String(customTypography.typographyFontWeightBold), // 700
        lineHeight: customTypography.typographyFontSizeDisplay * customTypography.typographyLineHeightNormal, // 32 * 1.3
      };
    case 'heading1':
      return {
        fontSize: customTypography.typographyFontSizeHeading1, // 28
        fontWeight: String(customTypography.typographyFontWeightBold), // 700
        lineHeight: customTypography.typographyFontSizeHeading1 * customTypography.typographyLineHeightNormal, // 28 * 1.3
      };
    case 'heading2':
      return {
        fontSize: customTypography.typographyFontSizeHeading2, // 24
        fontWeight: String(customTypography.typographyFontWeightSemibold), // 600
        lineHeight: customTypography.typographyFontSizeHeading2 * customTypography.typographyLineHeightRelaxed, // 24 * 1.4
      };
    case 'heading3':
      return {
        fontSize: customTypography.typographyFontSizeHeading3, // 20
        fontWeight: String(customTypography.typographyFontWeightSemibold), // 600
        lineHeight: customTypography.typographyFontSizeHeading3 * customTypography.typographyLineHeightRelaxed, // 20 * 1.4
      };
    case 'bodyLarge':
      return {
        fontSize: customTypography.typographyFontSizeBodyLarge, // 18
        fontWeight: String(customTypography.typographyFontWeightRegular), // 400
        lineHeight: customTypography.typographyFontSizeBodyLarge * customTypography.typographyLineHeightLoose, // 18 * 1.6
      };
    case 'body':
      return {
        fontSize: customTypography.typographyFontSizeBody, // 16
        fontWeight: String(customTypography.typographyFontWeightRegular), // 400
        lineHeight: customTypography.typographyFontSizeBody * customTypography.typographyLineHeightLoose, // 16 * 1.6
      };
    case 'caption':
      return {
        fontSize: customTypography.typographyFontSizeCaption, // 14
        fontWeight: String(customTypography.typographyFontWeightRegular), // 400
        lineHeight: customTypography.typographyFontSizeCaption * 1.5, // 14 * 1.5
      };
    case 'button':
      return {
        fontSize: customTypography.typographyFontSizeButton, // 16
        fontWeight: String(customTypography.typographyFontWeightSemibold), // 600
        lineHeight: customTypography.typographyFontSizeButton * customTypography.typographyLineHeightTight, // 16 * 1.0
      };
  }
}

// 색상 매핑
function getColorValue(color: TypographyColor): string {
  switch (color) {
    case 'primary':
      return customColors.colorNeutralDark; // #212121
    case 'secondary':
      return customColors.colorNeutralMid; // #616161
    case 'disabled':
      return '#9E9E9E'; // Material Design disabled
    case 'error':
      return customColors.colorError; // #C62828
    case 'success':
      return customColors.colorSuccess; // #2E7D32
    case 'warning':
      return customColors.colorWarningDefault; // #E65100
  }
}

// 폰트 무게 매핑
function getFontWeight(weight: 'regular' | 'semibold' | 'bold'): string {
  switch (weight) {
    case 'regular':
      return String(customTypography.typographyFontWeightRegular); // 400
    case 'semibold':
      return String(customTypography.typographyFontWeightSemibold); // 600
    case 'bold':
      return String(customTypography.typographyFontWeightBold); // 700
  }
}

const styles = StyleSheet.create({
  base: {
    // Noto Sans KR는 앱 레벨에서 설정 (expo-font 또는 react-native.config.js)
    // fontFamily: 'NotoSansKR-Regular',
  },
});

export default Typography;
