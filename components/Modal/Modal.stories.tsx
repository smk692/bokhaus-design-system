/**
 * Modal/Dialog Stories - 손밀리 디자인 시스템
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

export default {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    (Story: React.FC) => (
      <PaperProvider>
        <View style={styles.container}>
          <Story />
        </View>
      </PaperProvider>
    ),
  ],
};

// Alert (정보)
export const AlertModal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Alert 열기</Button>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        variant="alert"
        title="복약 알림"
        content="오전 8시 약을 아직 복용하지 않으셨습니다. 지금 복용하시겠습니까?"
        confirmLabel="확인"
        onConfirm={() => setVisible(false)}
      />
    </>
  );
};

// Confirm (확인/취소)
export const ConfirmModal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Confirm 열기</Button>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        variant="confirm"
        title="기록 삭제"
        content="이 건강 기록을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => { alert('삭제됨'); setVisible(false); }}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

// Custom (자유 구성)
export const CustomModal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Custom 열기</Button>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        variant="custom"
        title="긴급 연락"
        content={
          <View>
            <Typography variant="bodyLarge">보호자에게 알림을 보내시겠습니까?</Typography>
            <Typography variant="body" color="secondary">홍길동 (딸) · 010-1234-5678</Typography>
          </View>
        }
        actions={[
          { label: '취소', variant: 'text', onPress: () => setVisible(false) },
          { label: '전화하기', variant: 'outlined', onPress: () => setVisible(false) },
          { label: '문자 보내기', variant: 'filled', onPress: () => setVisible(false) },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
});
