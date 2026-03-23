/**
 * Badge Storybook Stories
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { Badge } from './Badge';
import Typography from '../Typography/Typography';
import { Avatar } from '../Avatar/Avatar';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['count', 'dot', 'label'],
      description: '뱃지 타입',
    },
    color: {
      control: 'select',
      options: ['error', 'primary', 'success', 'warning', 'neutral'],
      description: '색상',
    },
    count: { control: 'number', description: '숫자 (count 타입)' },
    maxCount: { control: 'number', description: '최대 숫자' },
    label: { control: 'text', description: '레이블 텍스트' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Count: Story = {
  args: {
    variant: 'count',
    count: 5,
    color: 'error',
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    color: 'error',
  },
};

export const Label: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, padding: 16, flexWrap: 'wrap' }}>
      <Badge variant="label" label="정상" color="success" />
      <Badge variant="label" label="주의" color="warning" />
      <Badge variant="label" label="위험" color="error" />
      <Badge variant="label" label="신규" color="primary" />
    </View>
  ),
};

export const OverflowCount: Story = {
  args: {
    variant: 'count',
    count: 150,
    maxCount: 99,
    color: 'error',
  },
};

export const BOKHAUSNotification: Story = {
  render: () => (
    <View style={{ gap: 20, padding: 16 }}>
      <Typography variant="heading3">알림 현황</Typography>
      <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <Badge variant="count" count={3} color="error">
            <Avatar name="긴급" size="large" backgroundColor="#C62828" />
          </Badge>
          <Typography variant="caption">긴급</Typography>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <Badge variant="count" count={7} color="warning">
            <Avatar name="방문" size="large" />
          </Badge>
          <Typography variant="caption">방문 예정</Typography>
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <Badge variant="dot" color="success">
            <Avatar name="메시지" size="large" />
          </Badge>
          <Typography variant="caption">새 메시지</Typography>
        </View>
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 알림 뱃지. 긴급/방문/메시지 상태 시각화.',
      },
    },
  },
};
