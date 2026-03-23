/**
 * Toast Storybook Stories
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Toast } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Toast 타입',
    },
    message: { control: 'text', description: '메시지' },
    duration: { control: 'number', description: '표시 시간 (ms, 최소 3000)' },
    actionLabel: { control: 'text', description: '액션 버튼 레이블' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastDemo = ({ type, message, actionLabel }: { type: any; message: string; actionLabel?: string }) => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ padding: 16 }}>
      <Button onPress={() => setVisible(true)}>Toast 표시</Button>
      <Toast
        type={type}
        message={message}
        visible={visible}
        onDismiss={() => setVisible(false)}
        actionLabel={actionLabel}
        onActionPress={() => setVisible(false)}
      />
    </View>
  );
};

export const Success: Story = {
  render: () => <ToastDemo type="success" message="저장되었습니다." />,
};

export const Error: Story = {
  render: () => <ToastDemo type="error" message="오류가 발생했습니다. 다시 시도해주세요." />,
};

export const Warning: Story = {
  render: () => <ToastDemo type="warning" message="인터넷 연결이 불안정합니다." />,
};

export const Info: Story = {
  render: () => <ToastDemo type="info" message="앱이 업데이트되었습니다." />,
};

export const WithAction: Story = {
  render: () => (
    <ToastDemo
      type="info"
      message="메시지가 삭제되었습니다."
      actionLabel="실행 취소"
    />
  ),
};

export const BOKHAUSExamples: Story = {
  render: () => (
    <View style={{ gap: 12, padding: 16 }}>
      <ToastDemo type="success" message="건강 체크가 기록되었습니다." />
      <ToastDemo type="error" message="보호자 연락처를 확인할 수 없습니다." />
      <ToastDemo type="warning" message="혈압이 정상 범위를 벗어났습니다." />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 시니어 앱 Toast 사용 패턴. 최소 3초 표시, 큰 텍스트.',
      },
    },
  },
};
