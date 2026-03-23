/**
 * Avatar Storybook Stories
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { Avatar } from './Avatar';
import Typography from '../Typography/Typography';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: '아바타 크기',
    },
    name: { control: 'text', description: '이름 (이니셜 생성)' },
    uri: { control: 'text', description: '이미지 URI' },
    showStatus: { control: 'boolean', description: '온라인 상태 표시' },
    isOnline: { control: 'boolean', description: '온라인 여부' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: '홍길동',
    size: 'medium',
  },
};

export const WithImage: Story = {
  args: {
    uri: 'https://i.pravatar.cc/150?img=1',
    size: 'large',
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, padding: 16, alignItems: 'center' }}>
      <Avatar name="김" size="small" />
      <Avatar name="이" size="medium" />
      <Avatar name="박" size="large" />
      <Avatar name="최" size="xlarge" />
    </View>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, padding: 16 }}>
      <Avatar name="온라인" size="large" showStatus isOnline />
      <Avatar name="오프라인" size="large" showStatus isOnline={false} />
    </View>
  ),
};

export const BOKHAUSCaregiver: Story = {
  render: () => (
    <View style={{ gap: 16, padding: 16 }}>
      <Typography variant="heading3">담당 케어매니저</Typography>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Avatar name="박케어" size="xlarge" showStatus isOnline />
        <View style={{ gap: 4 }}>
          <Typography variant="bodyLarge">박케어 매니저</Typography>
          <Typography variant="body" color="success">● 온라인</Typography>
          <Typography variant="caption" color="secondary">오늘 3회 방문 예정</Typography>
        </View>
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 케어매니저 프로필. xlarge 아바타 + 온라인 상태 표시.',
      },
    },
  },
};
