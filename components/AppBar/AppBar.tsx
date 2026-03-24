/**
 * AppBar Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 * 
 * 모든 화면 상단 헤더 — 타이틀, 뒤로가기, 액션 버튼
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Appbar as PaperAppbar } from 'react-native-paper';
import { customColors, customSpacing, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';

export interface AppBarAction {
  /**
   * Material Design 아이콘명
   */
  icon: string;
  
  /**
   * 터치 핸들러
   */
  onPress: () => void;
  
  /**
   * 접근성 레이블 (스크린리더용)
   */
  label: string;
  
  /**
   * 알림 뱃지 숫자
   */
  badge?: number;
}

export interface AppBarProps {
  /**
   * 화면 제목 (필수)
   */
  title: string;
  
  /**
   * 부제목 (선택)
   */
  subtitle?: string;
  
  /**
   * 뒤로가기 버튼 표시
   * @default false
   */
  showBack?: boolean;
  
  /**
   * 뒤로가기 핸들러 (showBack=true 시 필수)
   */
  onBack?: () => void;
  
  /**
   * AppBar 변형
   * - default: 타이틀 + 뒤로가기
   * - search: 검색창 내장
   * - actions: 우측 아이콘 버튼
   * @default 'default'
   */
  variant?: 'default' | 'search' | 'actions';
  
  /**
   * 검색 변경 핸들러 (variant='search' 시)
   */
  onSearchChange?: (text: string) => void;
  
  /**
   * 검색 플레이스홀더
   */
  searchPlaceholder?: string;
  
  /**
   * 액션 버튼 목록 (variant='actions' 시)
   */
  actions?: AppBarAction[];
  
  /**
   * 배경색
   * @default color.primary.main
   */
  backgroundColor?: string;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  variant = 'default',
  onSearchChange,
  searchPlaceholder = '검색',
  actions = [],
  backgroundColor = customColors.colorPrimaryDefault,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearchChange?.(text);
  };

  return (
    <PaperAppbar.Header
      style={[styles.header, { backgroundColor }]}
      statusBarHeight={0}
    >
      {/* 뒤로가기 버튼 */}
      {showBack && (
        <PaperAppbar.BackAction
          onPress={onBack}
          color={customColors.colorNeutralWhite}
          accessibilityLabel="뒤로가기"
          style={styles.backButton}
        />
      )}

      {/* 검색 변형 */}
      {variant === 'search' ? (
        <View style={styles.searchContainer}>
          <TextInput
            value={searchText}
            onChangeText={handleSearchChange}
            placeholder={searchPlaceholder}
            placeholderTextColor={customColors.colorNeutralMid}
            style={styles.searchInput}
            accessibilityLabel="검색"
            accessibilityHint="검색어를 입력하세요"
          />
        </View>
      ) : (
        /* 기본 타이틀 */
        <View style={styles.titleContainer}>
          <Typography
            variant="heading2"
            color="primary"
            weight="semibold"
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              color="secondary"
              style={styles.subtitle}
              numberOfLines={1}
            >
              {subtitle}
            </Typography>
          )}
        </View>
      )}

      {/* 액션 버튼들 */}
      {variant === 'actions' && actions.map((action, index) => (
        <View key={index} style={styles.actionWrapper}>
          <PaperAppbar.Action
            icon={action.icon}
            onPress={action.onPress}
            color={customColors.colorNeutralWhite}
            accessibilityLabel={action.label}
            style={styles.actionButton}
          />
          {action.badge && action.badge > 0 && (
            <View style={styles.badge}>
              <Typography
                variant="caption"
                color="primary"
                weight="semibold"
                style={styles.badgeText}
              >
                {action.badge > 99 ? '99+' : action.badge}
              </Typography>
            </View>
          )}
        </View>
      ))}
    </PaperAppbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    minHeight: customSpacing.spacingTouchRecommended, // 56px
  },
  backButton: {
    minWidth: customSpacing.spacingTouchMin, // 48px
    minHeight: customSpacing.spacingTouchMin,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  title: {
    color: customColors.colorNeutralWhite,
    fontSize: customTypography.typographyFontSizeHeading2, // 24px
  },
  subtitle: {
    color: customColors.colorNeutralLight,
    fontSize: customTypography.typographyFontSizeCaption, // 14px
    marginTop: 2,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  searchInput: {
    backgroundColor: customColors.colorNeutralWhite,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: customTypography.typographyFontSizeBody, // 16px
    color: customColors.colorNeutralDark,
    minHeight: 40,
  },
  actionWrapper: {
    position: 'relative',
  },
  actionButton: {
    minWidth: customSpacing.spacingTouchMin, // 48px
    minHeight: customSpacing.spacingTouchMin,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: customColors.colorError,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: customColors.colorNeutralWhite,
    fontSize: 11,
    lineHeight: 14,
  },
});

export default AppBar;
