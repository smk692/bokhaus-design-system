/**
 * Modal Storybook Stories
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import Typography from '../Typography/Typography';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['alert', 'confirm', 'custom'],
      description: '모달 타입',
    },
    title: { control: 'text', description: '제목' },
    confirmLabel: { control: 'text', description: '확인 버튼 레이블' },
    cancelLabel: { control: 'text', description: '취소 버튼 레이블' },
    dismissOnBackdrop: { control: 'boolean', description: '배경 클릭 닫기' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = (props: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ padding: 16 }}>
      <Button onPress={() => setVisible(true)}>Modal 열기</Button>
      <Modal
        {...props}
        visible={visible}
        onDismiss={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
};

export const Alert: Story = {
  render: () => (
    <ModalDemo
      variant="alert"
      title="알림"
      content="건강 체크가 완료되었습니다."
      confirmLabel="확인"
    />
  ),
};

export const Confirm: Story = {
  render: () => (
    <ModalDemo
      variant="confirm"
      title="로그아웃"
      content="로그아웃 하시겠습니까?"
      confirmLabel="로그아웃"
      cancelLabel="취소"
    />
  ),
};

export const DestructiveConfirm: Story = {
  render: () => (
    <ModalDemo
      variant="confirm"
      title="계정 삭제"
      content="계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다."
      confirmLabel="삭제"
      cancelLabel="취소"
    />
  ),
};

export const BOKHAUSEmergency: Story = {
  render: () => (
    <ModalDemo
      variant="confirm"
      title="🚨 긴급 알림"
      content={
        <View style={{ gap: 8 }}>
          <Typography variant="bodyLarge" color="error">
            혈압이 위험 수치를 초과했습니다.
          </Typography>
          <Typography variant="body">
            즉시 보호자에게 연락하시겠습니까?
          </Typography>
        </View>
      }
      confirmLabel="보호자 연락"
      cancelLabel="나중에"
      dismissOnBackdrop={false}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 긴급 상황 모달. 배경 클릭 닫기 비활성, 시니어 명확한 액션.',
      },
    },
  },
};
