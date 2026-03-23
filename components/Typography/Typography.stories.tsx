/**
 * Typography Storybook Stories
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'heading1', 'heading2', 'heading3', 'bodyLarge', 'body', 'caption', 'button'],
      description: '타이포그래피 변형',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'disabled', 'error', 'success', 'warning'],
      description: '텍스트 색상',
    },
    weight: {
      control: 'select',
      options: ['regular', 'semibold', 'bold'],
      description: '폰트 굵기',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '텍스트 정렬',
    },
    children: {
      control: 'text',
      description: '텍스트 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: '안녕하세요, BOKHAUS입니다.',
    variant: 'body',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16, padding: 16 }}>
      <Typography variant="display">Display (32px) — 메인 타이틀</Typography>
      <Typography variant="heading1">Heading 1 (28px) — 페이지 제목</Typography>
      <Typography variant="heading2">Heading 2 (24px) — 섹션 제목</Typography>
      <Typography variant="heading3">Heading 3 (20px) — 서브 섹션</Typography>
      <Typography variant="bodyLarge">Body Large (18px) — 중요 본문 (시니어 권장)</Typography>
      <Typography variant="body">Body (16px) — 일반 본문 (최소값)</Typography>
      <Typography variant="caption">Caption (14px) — 부가 정보</Typography>
      <Typography variant="button">Button (16px) — 버튼 레이블</Typography>
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 12, padding: 16 }}>
      <Typography color="primary">Primary (#212121)</Typography>
      <Typography color="secondary">Secondary (#616161)</Typography>
      <Typography color="disabled">Disabled (#9E9E9E)</Typography>
      <Typography color="error">Error (#C62828)</Typography>
      <Typography color="success">Success (#2E7D32)</Typography>
      <Typography color="warning">Warning (#E65100)</Typography>
    </View>
  ),
};

export const SeniorFriendly: Story = {
  render: () => (
    <View style={{ gap: 16, padding: 16, maxWidth: 400 }}>
      <Typography variant="heading1">건강 체크</Typography>
      <Typography variant="bodyLarge" color="secondary">
        오늘의 건강 상태를 기록해주세요
      </Typography>
      <Typography variant="body">
        혈압: 120/80 mmHg
      </Typography>
      <Typography variant="caption" color="success">
        ✓ 정상 범위입니다
      </Typography>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 시니어 앱 타이포그래피 패턴. 본문 최소 16px, 권장 18px.',
      },
    },
  },
};
