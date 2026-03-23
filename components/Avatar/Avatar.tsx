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
}) => {
  const pixelSize = SIZE_MAP[size];
  const bgColor = backgroundColor || customColors.colorPrimaryDefault;
  const statusSize = Math.max(10, pixelSize * 0.22);

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
    <View style={styles.wrapper}>
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
