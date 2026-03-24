/**
 * BottomNavigation Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 * 
 * 앱 메인 탭 이동 — 최하단 고정 탭바
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, AccessibilityInfo } from 'react-native';
import { BottomNavigation as PaperBottomNav } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { customColors, customSpacing, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';
import { Badge } from '../Badge/Badge';

export interface BottomNavRoute {
  /**
   * 고유 키
   */
  key: string;
  
  /**
   * 탭 레이블 (최대 6자 권장)
   */
  title: string;
  
  /**
   * 비활성 아이콘 (Material Design)
   */
  icon: string;
  
  /**
   * 활성 아이콘 (없으면 색상으로 구분)
   */
  activeIcon?: string;
  
  /**
   * 알림 표시
   */
  badge?: number | 'dot';
  
  /**
   * 스크린리더 레이블
   */
  accessibilityLabel?: string;
}

export interface BottomNavigationProps {
  /**
   * 탭 목록 (3~5개, 시니어는 3~4개 권장)
   */
  routes: BottomNavRoute[];
  
  /**
   * 현재 활성 탭 인덱스
   */
  activeIndex: number;
  
  /**
   * 탭 변경 핸들러
   */
  onIndexChange: (index: number) => void;
  
  /**
   * 배경색
   * @default color.neutral.white
   */
  backgroundColor?: string;
  
  /**
   * 활성 탭 색상
   * @default color.primary.main
   */
  activeColor?: string;
  
  /**
   * 비활성 탭 색상
   * @default color.neutral.medium
   */
  inactiveColor?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  routes,
  activeIndex,
  onIndexChange,
  backgroundColor = customColors.colorNeutralWhite,
  activeColor = customColors.colorPrimaryDefault,
  inactiveColor = customColors.colorNeutralMid,
}) => {
  const insets = useSafeAreaInsets();

  const handleIndexChange = (index: number) => {
    onIndexChange(index);
    // 접근성: 탭 전환 시 스크린리더가 새 탭을 읽도록 알림
    const selectedRoute = routes[index];
    const announcement = selectedRoute.accessibilityLabel || `${selectedRoute.title} 탭으로 이동`;
    AccessibilityInfo.announceForAccessibility(announcement);
  };

  const renderScene = PaperBottomNav.SceneMap(
    routes.reduce((acc, route) => {
      acc[route.key] = () => <View />;
      return acc;
    }, {} as Record<string, () => React.ReactElement>)
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingBottom: insets.bottom, // iOS safe area
        },
      ]}
    >
      <PaperBottomNav
        navigationState={{
          index: activeIndex,
          routes: routes.map(route => ({
            key: route.key,
            title: route.title,
            focusedIcon: route.activeIcon || route.icon,
            unfocusedIcon: route.icon,
          })),
        }}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
        barStyle={[styles.bar, { backgroundColor }]}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        labeled={true} // 레이블 항상 표시
        shifting={false} // 너비 고정
        renderLabel={({ route, focused, color }) => {
          const currentRoute = routes.find(r => r.key === route.key);
          return (
            <View style={styles.labelContainer}>
              <Typography
                variant="caption"
                color="primary"
                weight={focused ? 'semibold' : 'regular'}
                style={[styles.label, { color }]}
              >
                {route.title}
              </Typography>
              {currentRoute?.badge && (
                <View style={styles.badgeContainer}>
                  {currentRoute.badge === 'dot' ? (
                    <View style={styles.dot} />
                  ) : (
                    <Badge
                      variant="count"
                      label={currentRoute.badge > 99 ? '99+' : String(currentRoute.badge)}
                    />
                  )}
                </View>
              )}
            </View>
          );
        }}
        getLazy={() => false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: customColors.colorNeutralLight,
  },
  bar: {
    minHeight: 72, // 시니어 UX: 72px 최소 높이
    paddingVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: customTypography.typographyFontSizeCaption, // 14px
    marginTop: 4,
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: customColors.colorError,
  },
});

export default BottomNavigation;
