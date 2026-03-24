/**
 * Chip Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 * 
 * 필터 선택, AI 기능 태그, 카테고리 표시
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Chip as PaperChip } from 'react-native-paper';
import { customColors, customSpacing, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';

export interface ChipProps {
  /**
   * 레이블 (필수)
   */
  label: string;
  
  /**
   * Chip 변형
   * - filter: 선택/해제 토글 (다중 선택 가능)
   * - input: 입력값 표시 + 삭제 버튼
   * - suggestion: 추천 태그 (선택 시 사라짐)
   * @default 'filter'
   */
  variant?: 'filter' | 'input' | 'suggestion';
  
  /**
   * 선택 상태 (filter variant)
   */
  selected?: boolean;
  
  /**
   * 터치 핸들러
   */
  onPress?: () => void;
  
  /**
   * 삭제 핸들러 (input variant)
   */
  onDelete?: () => void;
  
  /**
   * 좌측 아이콘 (Material Design)
   */
  icon?: string;
  
  /**
   * 좌측 아바타 이미지 URL
   */
  avatar?: string;
  
  /**
   * 비활성 상태
   */
  disabled?: boolean;
  
  /**
   * 색상 테마
   * @default 'default'
   */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filter',
  selected = false,
  onPress,
  onDelete,
  icon,
  avatar,
  disabled = false,
  color = 'default',
}) => {
  const getBackgroundColor = () => {
    if (disabled) return customColors.colorNeutralLight;
    
    if (variant === 'filter' && selected) {
      switch (color) {
        case 'primary': return customColors.colorPrimaryDefault;
        case 'success': return customColors.colorSuccess;
        case 'warning': return customColors.colorWarningDefault;
        case 'error': return customColors.colorError;
        default: return customColors.colorPrimaryLight;
      }
    }
    
    return customColors.colorNeutralWhite;
  };

  const getTextColor = () => {
    if (disabled) return customColors.colorNeutralMid;
    if (variant === 'filter' && selected && color !== 'default') {
      return customColors.colorNeutralWhite;
    }
    return customColors.colorNeutralDark;
  };

  const getBorderColor = () => {
    if (disabled) return customColors.colorNeutralLight;
    if (variant === 'filter' && selected) {
      return 'transparent';
    }
    return customColors.colorNeutralMid;
  };

  const chipStyle = [
    styles.chip,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
    },
  ];

  const textColor = getTextColor();

  return (
    <PaperChip
      mode="outlined"
      selected={selected}
      onPress={disabled ? undefined : onPress}
      onClose={variant === 'input' && onDelete ? onDelete : undefined}
      icon={icon}
      avatar={avatar ? <Image source={{ uri: avatar }} style={styles.avatar} /> : undefined}
      disabled={disabled}
      style={chipStyle}
      textStyle={[styles.text, { color: textColor }]}
      selectedColor={textColor}
      closeIcon={variant === 'input' ? 'close-circle' : undefined}
      accessibilityRole={variant === 'filter' ? 'checkbox' : 'button'}
      accessibilityState={variant === 'filter' ? { checked: selected } : undefined}
      accessibilityLabel={
        variant === 'input'
          ? `${label} 삭제`
          : variant === 'filter'
          ? `${label}${selected ? ' 선택됨' : ''}`
          : label
      }
    >
      {label}
    </PaperChip>
  );
};

const styles = StyleSheet.create({
  chip: {
    minHeight: 44, // 시니어 UX: 44px 최소 높이 (WCAG AA)
    borderWidth: 1,
    borderRadius: 22,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: customTypography.typographyFontSizeBody, // 16px
    lineHeight: 20,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

export default Chip;
