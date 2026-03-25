/**
 * Avatar Component - 손밀리 디자인 시스템
 * BOKHAUS 시니어 UX 최적화
 *
 * 이미지 → 이니셜 → 기본 아이콘 순서로 fallback
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Avatar as PaperAvatar } from 'react-native-paper';
import { customColors } from '../../build/react-native/theme';
import { Typography } from '../Typography/Typography';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface AvatarProps {
  /**
   * 이미지 URI (우선순위 1)
   */
  uri?: string;

  /**
   * 이름 (이니셜 생성용, 우선순위 2)
   * 예: "홍길동" → "홍"
   */
  name?: string;

  /**
   * 아이콘 이름 (Material Community Icons, 우선순위 3)
   * @default 'account'
   */
  icon?: string;

  /**
   * 접근성 레이블 (스크린리더용)
   * 미설정 시 name 기반 자동 생성
   * 예: "홍길동 프로필 사진"
   */
  accessibilityLabel?: string;

  /**
   * 터치 가능 여부 (accessibilityRole 결정)
   * true → "button", false → "image"
   * @default false
   */
  touchable?: boolean;

  /**
   * 아바타 크기
   * - small: 32px
   * - medium: 48px (기본)
   * - large: 64px
   * - xlarge: 80px (시니어 앱 프로필)
   * @default 'medium'
   */
  size?: AvatarSize;

  /**
   * 배경 색상 (이니셜/아이콘 모드)
   * 기본: primary color
   */
  backgroundColor?: string;

  /**
   * 온라인 상태 뱃지 표시
   */
  showStatus?: boolean;

  /**
   * 온라인 여부 (showStatus=true일 때)
   */
  isOnline?: boolean;

  /**
   * 추가 스타일
   */
  style?: ViewStyle;
}

// 크기 매핑
const SIZE_MAP: Record<AvatarSize, number> = {
  small: 32,
  medium: 48,
  large: 64,
  xlarge: 80,
};

// 이름에서 이니셜 추출 (한국어 지원)
function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '?';
  // 한국어: 첫 글자
  const firstChar = trimmed[0];
  return firstChar.toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  icon = 'account',
  size = 'medium',
  backgroundColor,
  showStatus = false,
  isOnline = false,
  style,
  accessibilityLabel: accessibilityLabelProp,
  touchable = false,
}) => {
  const pixelSize = SIZE_MAP[size];
  const bgColor = backgroundColor || customColors.colorPrimaryDefault;
  const statusSize = Math.max(10, pixelSize * 0.22);

  // WCAG 1.1.1: 이미지 대체 텍스트 자동 생성
  const defaultLabel = name ? `${name} 프로필 사진` : '프로필 사진';
  const a11yLabel = accessibilityLabelProp || defaultLabel;
  // 터치 가능 여부에 따라 역할 결정
  const a11yRole = touchable ? 'button' : 'image';
  // 온라인 상태도 스크린리더에 전달
  const a11yState = showStatus ? { selected: isOnline } : undefined;
  const statusHint = showStatus
    ? (isOnline ? '온라인 상태' : '오프라인 상태')
    : undefined;

  const renderAvatar = () => {
    // 1순위: 이미지
    if (uri) {
      return (
        <PaperAvatar.Image
          size={pixelSize}
          source={{ uri }}
          style={[styles.avatar, style]}
        />
      );
    }

    // 2순위: 이니셜
    if (name) {
      return (
        <PaperAvatar.Text
          size={pixelSize}
          label={getInitials(name)}
          style={[styles.avatar, { backgroundColor: bgColor }, style]}
          labelStyle={styles.initialsLabel}
        />
      );
    }

    // 3순위: 아이콘 (기본)
    return (
      <PaperAvatar.Icon
        size={pixelSize}
        icon={icon}
        style={[styles.avatar, { backgroundColor: bgColor }, style]}
        color={customColors.colorNeutralWhite}
      />
    );
  };

  return (
    <View
      style={styles.wrapper}
      // WCAG 1.1.1 / 4.1.2: 접근성 속성
      accessibilityLabel={a11yLabel}
      accessibilityRole={a11yRole}
      accessibilityState={a11yState}
      accessibilityHint={statusHint}
    >
      {renderAvatar()}

      {/* 온라인 상태 뱃지 */}
      {showStatus && (
        <View
          style={[
            styles.statusBadge,
            {
              width: statusSize,
              height: statusSize,
              borderRadius: statusSize / 2,
              backgroundColor: isOnline
                ? customColors.colorSuccess
                : customColors.colorNeutralMid,
              right: 0,
              bottom: 0,
            },
          ]}
          // 시각적 상태 뱃지는 부모 View에서 이미 처리하므로 hidden
          accessibilityElementsHidden={true}
          importantForAccessibility="no"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  avatar: {
    // 기본 스타일은 PaperAvatar가 처리
  },
  initialsLabel: {
    color: customColors.colorNeutralWhite,
    fontWeight: '600',
  },
  statusBadge: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: customColors.colorNeutralWhite,
  },
});

export default Avatar;
