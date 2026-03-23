/**
 * Badge Stories
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Icon } from 'react-native-paper';
import { Badge } from './Badge';
import { Typography } from '../Typography/Typography';

export default {
  title: 'Components/Badge',
  component: Badge,
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

export const CountBadge = () => (
  <View style={styles.row}>
    <View style={styles.item}>
      <Badge count={3}><Icon source="bell-outline" size={28} /></Badge>
      <Typography variant="caption">알림 3</Typography>
    </View>
    <View style={styles.item}>
      <Badge count={99}><Icon source="chat-outline" size={28} /></Badge>
      <Typography variant="caption">99</Typography>
    </View>
    <View style={styles.item}>
      <Badge count={150}><Icon source="email-outline" size={28} /></Badge>
      <Typography variant="caption">99+ (overflow)</Typography>
    </View>
  </View>
);

export const DotBadge = () => (
  <View style={styles.row}>
    <View style={styles.item}>
      <Badge variant="dot"><Icon source="bell-outline" size={28} /></Badge>
      <Typography variant="caption">읽지 않음</Typography>
    </View>
    <View style={styles.item}>
      <Badge variant="dot" color="success" />
      <Typography variant="caption">온라인 (단독)</Typography>
    </View>
  </View>
);

export const LabelBadge = () => (
  <View style={styles.row}>
    {[
      { label: 'NEW', color: 'primary' },
      { label: '긴급', color: 'error' },
      { label: '완료', color: 'success' },
      { label: '주의', color: 'warning' },
    ].map((item) => (
      <View key={item.label} style={styles.item}>
        <Badge variant="label" label={item.label} color={item.color as any} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  row: { flexDirection: 'row', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' },
  item: { alignItems: 'center', gap: 8 },
});
