import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { AppBar } from './AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Navigation/AppBar',
  component: AppBar,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'search', 'actions'],
    },
    showBack: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AppBar>;

/**
 * 기본 AppBar — 타이틀만 표시
 */
export const Default: Story = {
  args: {
    title: '홈',
    variant: 'default',
  },
};

/**
 * 뒤로가기 버튼 포함
 */
export const WithBackButton: Story = {
  args: {
    title: '설정',
    showBack: true,
    onBack: () => console.log('뒤로가기'),
  },
};

/**
 * 부제목 포함
 */
export const WithSubtitle: Story = {
  args: {
    title: 'AI 대화',
    subtitle: '마지막 대화: 5분 전',
    showBack: true,
    onBack: () => console.log('뒤로가기'),
  },
};

/**
 * 검색 변형 — 검색창 내장
 */
export const SearchVariant: Story = {
  args: {
    title: '검색',
    variant: 'search',
    searchPlaceholder: '이름 또는 전화번호 검색',
    onSearchChange: (text: string) => console.log('검색:', text),
  },
};

/**
 * 액션 버튼 변형 — 우측 아이콘 버튼
 */
export const ActionsVariant: Story = {
  args: {
    title: '알림',
    variant: 'actions',
    showBack: true,
    onBack: () => console.log('뒤로가기'),
    actions: [
      {
        icon: 'bell',
        onPress: () => console.log('알림'),
        label: '알림',
        badge: 3,
      },
      {
        icon: 'cog',
        onPress: () => console.log('설정'),
        label: '설정',
      },
    ],
  },
};

/**
 * 뱃지 99+ 표시
 */
export const WithLargeBadge: Story = {
  args: {
    title: '메시지',
    variant: 'actions',
    actions: [
      {
        icon: 'email',
        onPress: () => console.log('메시지'),
        label: '메시지',
        badge: 150,
      },
    ],
  },
};

/**
 * 시니어 모드 — 큰 터치 영역
 */
export const SeniorMode: Story = {
  args: {
    title: 'BOKHAUS',
    subtitle: '오늘도 건강한 하루 되세요',
    variant: 'actions',
    showBack: true,
    onBack: () => console.log('뒤로가기'),
    actions: [
      {
        icon: 'phone',
        onPress: () => console.log('전화'),
        label: '긴급 전화',
      },
      {
        icon: 'help-circle',
        onPress: () => console.log('도움말'),
        label: '도움말',
      },
    ],
  },
};
