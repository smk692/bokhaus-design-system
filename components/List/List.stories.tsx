/**
 * List Storybook Stories
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { List, ListItem } from './List';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import Typography from '../Typography/Typography';

const meta: Meta<typeof ListItem> = {
  title: 'Components/List',
  component: ListItem,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '메인 텍스트' },
    subtitle: { control: 'text', description: '보조 텍스트' },
    leftIcon: { control: 'text', description: '왼쪽 아이콘' },
    showChevron: { control: 'boolean', description: '오른쪽 화살표' },
    showDivider: { control: 'boolean', description: '구분선' },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    title: '홍길동',
    subtitle: '오늘 오후 2시 방문 예정',
    showChevron: true,
  },
};

export const WithIcon: Story = {
  render: () => (
    <View style={{ maxWidth: 400 }}>
      <ListItem title="건강 체크" subtitle="오늘 오전 10시" leftIcon="heart-pulse" showChevron />
      <ListItem title="투약 관리" subtitle="아침 복용 완료" leftIcon="pill" showChevron />
      <ListItem title="응급 연락처" subtitle="박케어 매니저" leftIcon="phone" showChevron />
    </View>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <View style={{ maxWidth: 400 }}>
      <ListItem
        title="김할머니"
        subtitle="302호 · 오늘 방문 완료"
        leftElement={<Avatar name="김할머니" size="medium" />}
        rightElement={<Badge variant="label" label="정상" color="success" />}
        showChevron
      />
      <ListItem
        title="이할아버지"
        subtitle="205호 · 방문 예정"
        leftElement={<Avatar name="이할아버지" size="medium" />}
        rightElement={<Badge variant="dot" color="warning" />}
        showChevron
      />
    </View>
  ),
};

export const BOKHAUSResidentList: Story = {
  render: () => {
    const residents = [
      { name: '김순자', room: '101호', status: '정상', statusColor: 'success' as const },
      { name: '이봉수', room: '203호', status: '주의', statusColor: 'warning' as const },
      { name: '박영희', room: '305호', status: '정상', statusColor: 'success' as const },
    ];
    return (
      <View style={{ maxWidth: 400 }}>
        <Typography variant="heading3" style={{ padding: 16 }}>입소자 현황</Typography>
        <List
          data={residents}
          keyExtractor={(item) => item.room}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={item.room}
              leftElement={<Avatar name={item.name} size="medium" />}
              rightElement={<Badge variant="label" label={item.status} color={item.statusColor} />}
              showChevron
              onPress={() => {}}
            />
          )}
        />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 기관 어드민 입소자 목록. 72px 행 높이, 큰 터치 영역.',
      },
    },
  },
};
