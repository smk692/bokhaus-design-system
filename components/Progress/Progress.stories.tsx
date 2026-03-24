import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';
import { Spinner } from './Spinner';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Progress',
  component: ProgressBar,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#fff' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

/**
 * ProgressBar — 기본
 */
export const BasicProgressBar: Story = {
  args: {
    value: 65,
    label: '업로드 중',
    showValue: true,
  },
};

/**
 * ProgressBar — Indeterminate (무한)
 */
export const IndeterminateProgressBar: Story = {
  args: {
    label: '처리 중...',
  },
};

/**
 * ProgressBar — 애니메이션
 */
export const AnimatedProgressBar: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 500);

      return () => clearInterval(interval);
    }, []);

    return (
      <ProgressBar
        value={progress}
        label="다운로드 중"
        showValue
      />
    );
  },
};

/**
 * Spinner — 크기 변형
 */
export const SpinnerSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
    </View>
  ),
};

/**
 * Spinner — 레이블 포함 (시니어 UX)
 */
export const SpinnerWithLabel: Story = {
  render: () => (
    <Spinner
      size="large"
      label="불러오는 중..."
    />
  ),
};

/**
 * Skeleton — Text
 */
export const SkeletonText: Story = {
  render: () => (
    <View>
      <Skeleton variant="text" width="100%" height={20} lines={3} />
    </View>
  ),
};

/**
 * Skeleton — Circular (Avatar)
 */
export const SkeletonCircular: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Skeleton variant="circular" width={40} />
      <Skeleton variant="circular" width={56} />
      <Skeleton variant="circular" width={72} />
    </View>
  ),
};

/**
 * Skeleton — Rectangular (Card)
 */
export const SkeletonCard: Story = {
  render: () => (
    <View>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <View style={{ marginTop: 12 }}>
        <Skeleton variant="text" width="80%" height={24} />
        <View style={{ marginTop: 8 }}>
          <Skeleton variant="text" width="100%" height={16} lines={2} />
        </View>
      </View>
    </View>
  ),
};

/**
 * BOKHAUS 로딩 화면
 */
export const BOKHAUSLoading: Story = {
  render: () => (
    <View style={{ padding: 24 }}>
      <Spinner size="large" label="건강 데이터를 불러오는 중..." />
      <View style={{ marginTop: 32 }}>
        <ProgressBar
          value={75}
          label="동기화 중"
          showValue
          height={12}
        />
      </View>
    </View>
  ),
};

/**
 * Skeleton — List 로딩
 */
export const SkeletonList: Story = {
  render: () => (
    <View>
      {[1, 2, 3].map((index) => (
        <View key={index} style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'center' }}>
          <Skeleton variant="circular" width={56} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Skeleton variant="text" width="60%" height={20} />
            <View style={{ marginTop: 8 }}>
              <Skeleton variant="text" width="90%" height={14} />
            </View>
          </View>
        </View>
      ))}
    </View>
  ),
};
