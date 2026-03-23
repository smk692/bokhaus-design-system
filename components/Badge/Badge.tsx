/**
 * Badge Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 *
 * 알림 수, 상태, 레이블 표시용
 * React Native Paper Badge 기반 + 확장
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Badge as PaperBadge } from 'react-native-paper';
import { customColors, customTypography } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';

export type BadgeVariant = 'count' | 'dot' | 'label';
export type BadgeColor = 'error' | 'primary' | 'success' | 'warning' | 'neutral';

export interface BadgeProps {
  /**
   * 뱃지 타입
   * - count: 숫자 표시 (알림 개수)
   * - dot: 점 표시 (읽지 않은 상태)
   * - label: 텍스트 레이블 (상태 태그)
   * @default 'count'
   */
  variant?: BadgeVariant;

  /**
   * 숫자 값 (variant="count")
   */
  count?: number;

  /**
   * 최대 표시 숫자 (초과 시 "99+" 등)
   * @default 99
   */
  maxCount?: number;

  /**
   * 레이블 텍스트 (variant="label")
   */
  label?: string;

  /**
   * 뱃지 색상
   * @default 'error'
   */
  color?: BadgeColor;

  /**
   * 표시 여부 (count=0이어도 강제 표시)
   */
  visible?: boolean;

  /**
   * 자식 요소에 오버레이 (아이콘 위에 뱃지)
   */
  children?: React.ReactNode;

  /**
   * 추가 스타일
   */
  style?: ViewStyle;
}

// 색상 매핑
const COLOR_MAP: Record<BadgeColor, string> = {
  error: '#C62828',
  primary: '#1565C0',
  success: '#2E7D32',
  warning: '#E65100',
  neutral: '#616161',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'count',
  count,
  maxCount = 99,
  label,
  color = 'error',
  visible,
  children,
  style,
}) => {
  const badgeColor = COLOR_MAP[color];

  // 표시 여부 결정
  const shouldShow = (() => {
    if (visible !== undefined) return visible;
    if (variant === 'count') return (count ?? 0) > 0;
    return true;
  })();

  // 숫자 포맷
  const countText = (() => {
    if (count === undefined) return '';
    return count > maxCount ? `${maxCount}+` : String(count);
  })();

  // children 없이 단독 사용 (인라인 뱃지)
  if (!children) {
    if (!shouldShow) return null;

    if (variant === 'dot') {
      return (
        <View
          style={[
            styles.dot,
            { backgroundColor: badgeColor },
            style,
          ]}
        />
      );
    }

    if (variant === 'label' && label) {
      return (
        <View style={[styles.labelBadge, { backgroundColor: badgeColor }, style]}>
          <Typography
            variant="caption"
            style={{ color: customColors.colorNeutralWhite, fontSize: 11, fontWeight: '600' }}
          >
            {label}
          </Typography>
        </View>
      );
    }

    // count 단독
    return (
      <PaperBadge
        visible={shouldShow}
        size={20}
        style={[styles.badge, { backgroundColor: badgeColor }, style]}
      >
        {countText}
      </PaperBadge>
    );
  }

  // children 위에 오버레이
  return (
    <View style={styles.wrapper}>
      {children}
      {shouldShow && (
        variant === 'dot' ? (
          <View
            style={[
              styles.dot,
              styles.overlayDot,
              { backgroundColor: badgeColor },
            ]}
          />
        ) : variant === 'label' && label ? (
          <View style={[styles.labelBadge, styles.overlayLabel, { backgroundColor: badgeColor }]}>
            <Typography
              variant="caption"
              style={{ color: customColors.colorNeutralWhite, fontSize: 11, fontWeight: '600' }}
            >
              {label}
            </Typography>
          </View>
        ) : (
          <PaperBadge
            visible={shouldShow}
            size={20}
            style={[styles.badge, styles.overlayBadge, { backgroundColor: badgeColor }]}
          >
            {countText}
          </PaperBadge>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  badge: {
    fontSize: 11,
    fontWeight: '600',
  },
  overlayBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  overlayDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    borderWidth: 2,
    borderColor: customColors.colorNeutralWhite,
  },
  labelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  overlayLabel: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
});

export default Badge;
