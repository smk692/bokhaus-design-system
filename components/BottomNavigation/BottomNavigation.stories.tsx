import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomNavigation, BottomNavRoute } from './BottomNavigation';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Navigation/BottomNavigation',
  component: BottomNavigation,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

/**
 * 기본 3탭 (시니어 권장)
 */
export const ThreeTabs: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const routes: BottomNavRoute[] = [
      { key: 'home', title: '홈', icon: 'home' },
      { key: 'calendar', title: '일정', icon: 'calendar' },
      { key: 'profile', title: '내 정보', icon: 'account' },
    ];

    return (
      <BottomNavigation
        routes={routes}
        activeIndex={index}
        onIndexChange={setIndex}
      />
    );
  },
};

/**
 * 4탭 — 알림 뱃지 포함
 */
export const FourTabsWithBadge: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const routes: BottomNavRoute[] = [
      { key: 'home', title: '홈', icon: 'home' },
      { key: 'messages', title: '메시지', icon: 'email', badge: 5 },
      { key: 'notifications', title: '알림', icon: 'bell', badge: 'dot' },
      { key: 'profile', title: '내 정보', icon: 'account' },
    ];

    return (
      <BottomNavigation
        routes={routes}
        activeIndex={index}
        onIndexChange={setIndex}
      />
    );
  },
};

/**
 * 5탭 (최대)
 */
export const FiveTabs: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const routes: BottomNavRoute[] = [
      { key: 'home', title: '홈', icon: 'home' },
      { key: 'search', title: '검색', icon: 'magnify' },
      { key: 'add', title: '추가', icon: 'plus-circle' },
      { key: 'notifications', title: '알림', icon: 'bell', badge: 12 },
      { key: 'profile', title: '내 정보', icon: 'account' },
    ];

    return (
      <BottomNavigation
        routes={routes}
        activeIndex={index}
        onIndexChange={setIndex}
      />
    );
  },
};

/**
 * BOKHAUS 시니어 앱 — 3탭
 */
export const BOKHAUSSenior: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const routes: BottomNavRoute[] = [
      {
        key: 'home',
        title: '홈',
        icon: 'home',
        activeIcon: 'home',
        accessibilityLabel: '홈 화면',
      },
      {
        key: 'ai',
        title: 'AI 대화',
        icon: 'chat',
        activeIcon: 'chat',
        badge: 'dot',
        accessibilityLabel: 'AI 대화, 새 메시지 있음',
      },
      {
        key: 'settings',
        title: '설정',
        icon: 'cog',
        activeIcon: 'cog',
        accessibilityLabel: '설정',
      },
    ];

    return (
      <BottomNavigation
        routes={routes}
        activeIndex={index}
        onIndexChange={setIndex}
      />
    );
  },
};

/**
 * 뱃지 99+ 표시
 */
export const LargeBadge: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const routes: BottomNavRoute[] = [
      { key: 'home', title: '홈', icon: 'home' },
      { key: 'messages', title: '메시지', icon: 'email', badge: 150 },
      { key: 'profile', title: '내 정보', icon: 'account' },
    ];

    return (
      <BottomNavigation
        routes={routes}
        activeIndex={index}
        onIndexChange={setIndex}
      />
    );
  },
};
