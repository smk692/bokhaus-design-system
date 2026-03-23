/**
 * Avatar Stories
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Avatar } from './Avatar';
import { Typography } from '../Typography/Typography';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  decorators: [
    (Story: React.FC) => (
      <PaperProvider>
        <View style={styles.container}>
          <Story />
        </View>
      </PaperProvider>
    ),
  ],
};

// 크기별 비교
export const Sizes = () => (
  <View style={styles.row}>
    {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
      <View key={size} style={styles.item}>
        <Avatar name="홍길동" size={size} />
        <Typography variant="caption" align="center">{size}</Typography>
      </View>
    ))}
  </View>
);

// Fallback 순서: 이미지 → 이니셜 → 아이콘
export const FallbackOrder = () => (
  <View style={styles.row}>
    <View style={styles.item}>
      <Avatar uri="https://i.pravatar.cc/80" size="large" />
      <Typography variant="caption" align="center">이미지</Typography>
    </View>
    <View style={styles.item}>
      <Avatar name="김어르신" size="large" />
      <Typography variant="caption" align="center">이니셜</Typography>
    </View>
    <View style={styles.item}>
      <Avatar icon="account" size="large" />
      <Typography variant="caption" align="center">아이콘</Typography>
    </View>
  </View>
);

// 온라인 상태 (보호자 앱)
export const WithStatus = () => (
  <View style={styles.row}>
    <View style={styles.item}>
      <Avatar name="김어르신" size="large" showStatus isOnline />
      <Typography variant="caption" align="center">온라인</Typography>
    </View>
    <View style={styles.item}>
      <Avatar name="이어르신" size="large" showStatus isOnline={false} />
      <Typography variant="caption" align="center">오프라인</Typography>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  row: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  item: { alignItems: 'center', gap: 4 },
});
