/**
 * Card Storybook Stories
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { Card } from './Card';
import Typography from '../Typography/Typography';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['low', 'medium', 'high'],
      description: '그림자 높이',
    },
    touchable: {
      control: 'boolean',
      description: '터치 가능 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <Typography variant="body">카드 기본 내용입니다.</Typography>,
    elevation: 'low',
  },
};

export const WithHeader: Story = {
  render: () => (
    <Card
      header={<Typography variant="heading3">건강 기록</Typography>}
      footer={<Button variant="text">자세히 보기</Button>}
    >
      <Typography variant="body">오늘의 건강 상태가 기록되었습니다.</Typography>
    </Card>
  ),
};

export const Elevations: Story = {
  render: () => (
    <View style={{ gap: 24, padding: 16 }}>
      {(['low', 'medium', 'high'] as const).map((elev) => (
        <Card key={elev} elevation={elev}>
          <Typography variant="body">Elevation: {elev}</Typography>
        </Card>
      ))}
    </View>
  ),
};

export const Touchable: Story = {
  args: {
    touchable: true,
    onPress: () => alert('카드 터치!'),
    children: <Typography variant="body">터치 가능한 카드입니다.</Typography>,
  },
};

export const BOKHAUSHealthCard: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 16, maxWidth: 400 }}>
      <Card
        elevation="medium"
        header={<Typography variant="heading2">📊 오늘의 건강 체크</Typography>}
        footer={
          <Button variant="outlined" size="large" fullWidth>
            상세 보기
          </Button>
        }
      >
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="bodyLarge">혈압</Typography>
            <Typography variant="bodyLarge" color="success">120/80</Typography>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="bodyLarge">혈당</Typography>
            <Typography variant="bodyLarge" color="success">95 mg/dL</Typography>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="bodyLarge">체온</Typography>
            <Typography variant="bodyLarge" color="success">36.5°C</Typography>
          </View>
        </View>
      </Card>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 건강 체크 카드. 시니어 친화 큰 글씨 + 색상 코딩.',
      },
    },
  },
};
