/**
 * Card Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Card as PaperCard, CardProps as PaperCardProps } from 'react-native-paper';
import { customColors, customSpacing } from '../../build/react-native/theme';

export interface CardProps extends Omit<PaperCardProps, 'mode' | 'elevation'> {
  /**
   * Header 영역 (선택)
   */
  header?: React.ReactNode;
  
  /**
   * Content 영역 (필수)
   */
  children: React.ReactNode;
  
  /**
   * Footer 영역 (선택)
   */
  footer?: React.ReactNode;
  
  /**
   * 터치 가능 여부
   * @default false
   */
  touchable?: boolean;
  
  /**
   * 터치 핸들러 (touchable=true 시)
   */
  onPress?: () => void;
  
  /**
   * Elevation (그림자 높이)
   * - low: 2 (기본)
   * - medium: 4
   * - high: 8
   * @default 'low'
   */
  elevation?: 'low' | 'medium' | 'high';
}

export const Card: React.FC<CardProps> = ({
  header,
  children,
  footer,
  touchable = false,
  onPress,
  elevation = 'low',
  style,
  ...props
}) => {
  // Elevation 값 매핑
  const elevationValue = getElevationValue(elevation);

  const cardStyle: ViewStyle[] = [
    styles.card,
    { elevation: elevationValue },
    style as ViewStyle,
  ];

  const content = (
    <>
      {header && (
        <View style={styles.header}>
          {header}
        </View>
      )}
      
      <PaperCard.Content style={styles.content}>
        {children}
      </PaperCard.Content>
      
      {footer && (
        <View style={styles.footer}>
          {footer}
        </View>
      )}
    </>
  );

  if (touchable) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={cardStyle}
        accessibilityRole="button"
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <PaperCard style={cardStyle} {...props}>
      {content}
    </PaperCard>
  );
};

// Elevation 값 매핑
function getElevationValue(elevation: 'low' | 'medium' | 'high'): number {
  switch (elevation) {
    case 'low':
      return 2;
    case 'medium':
      return 4;
    case 'high':
      return 8;
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: customColors.colorSurface, // #FFFFFF
    borderRadius: 12, // CPO 요구사항
    overflow: 'hidden',
    // Elevation은 동적으로 적용
  },
  header: {
    padding: 16, // CPO 요구사항
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    padding: 16, // CPO 요구사항 (PaperCard.Content 기본 padding 제거)
  },
  footer: {
    padding: 16, // CPO 요구사항
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});

export default Card;
