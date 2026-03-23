/**
 * List / ListItem Stories
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { List, ListItem } from './List';

export default {
  title: 'Components/List',
  component: List,
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

// 기본 리스트 (BOKHAUS 건강 기록)
export const HealthRecordList = () => (
  <List
    data={[
      { title: '혈압 측정', subtitle: '오전 8:02 · 120/80 mmHg', icon: 'heart-pulse' },
      { title: '혈당 측정', subtitle: '오전 8:15 · 95 mg/dL', icon: 'water' },
      { title: '체중 측정', subtitle: '오전 8:20 · 62.3 kg', icon: 'scale-bathroom' },
      { title: '복약 기록', subtitle: '오전 8:30 · 3종', icon: 'pill' },
    ]}
    sectionTitle="오늘의 건강 기록"
    renderItem={(item) => (
      <ListItem
        title={item.title}
        subtitle={item.subtitle}
        leftIcon={item.icon}
        showChevron
        onPress={() => console.log(item.title)}
      />
    )}
  />
);

// 설정 리스트 (with Switch)
export const SettingsList = () => {
  const [notifications, setNotifications] = React.useState(true);
  return (
    <List
      data={[
        { title: '복약 알림', subtitle: '매일 오전 8시', key: 'medication' },
        { title: '혈압 측정 알림', subtitle: '매일 오전 7시 30분', key: 'bp' },
        { title: '주간 보고서', subtitle: '매주 월요일', key: 'report' },
      ]}
      sectionTitle="알림 설정"
      renderItem={(item) => (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
          leftIcon="bell-outline"
          rightElement={
            <View style={{ justifyContent: 'center' }}>
              {/* Switch 컴포넌트 (Phase 4 Form) */}
            </View>
          }
        />
      )}
    />
  );
};

// 빈 목록
export const EmptyList = () => (
  <List
    data={[]}
    renderItem={(item) => <ListItem title={item as string} />}
    emptyText="아직 기록이 없습니다"
    sectionTitle="이번 달 기록"
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
});
