/**
 * Toast Storybook Stories
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Toast from './Toast';
import Button from '../Button/Button';
import theme from '../../build/react-native/theme';

export default {
  title: 'Components/Toast',
  component: Toast,
  decorators: [
    (Story: React.FC) => (
      <PaperProvider theme={theme}>
        <View style={{ padding: 16, gap: 16 }}>
          <Story />
        </View>
      </PaperProvider>
    ),
  ],
};

export const Success = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Success Toast 표시</Button>
      <Toast 
        type="success"
        visible={visible}
        message="저장되었습니다"
        onDismiss={() => setVisible(false)}
      />
    </>
  );
};

export const Error = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Error Toast 표시</Button>
      <Toast 
        type="error"
        visible={visible}
        message="오류가 발생했습니다"
        onDismiss={() => setVisible(false)}
      />
    </>
  );
};

export const Warning = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Warning Toast 표시</Button>
      <Toast 
        type="warning"
        visible={visible}
        message="주의가 필요합니다"
        onDismiss={() => setVisible(false)}
      />
    </>
  );
};

export const Info = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Info Toast 표시</Button>
      <Toast 
        type="info"
        visible={visible}
        message="새로운 알림이 있습니다"
        onDismiss={() => setVisible(false)}
      />
    </>
  );
};

export const WithAction = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Action Toast 표시</Button>
      <Toast 
        type="info"
        visible={visible}
        message="삭제되었습니다"
        onDismiss={() => setVisible(false)}
        actionLabel="실행 취소"
        onActionPress={() => {
          alert('실행 취소됨');
          setVisible(false);
        }}
      />
    </>
  );
};

export const LongDuration = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Long Toast 표시 (5초)</Button>
      <Toast 
        type="success"
        visible={visible}
        message="5초 동안 표시됩니다"
        onDismiss={() => setVisible(false)}
        duration={5000}
      />
    </>
  );
};

export const AllTypes = () => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <>
      <View style={{ gap: 8 }}>
        <Button variant="filled" onPress={() => setSuccessVisible(true)}>
          Success
        </Button>
        <Button variant="filled" onPress={() => setErrorVisible(true)}>
          Error
        </Button>
        <Button variant="filled" onPress={() => setWarningVisible(true)}>
          Warning
        </Button>
        <Button variant="filled" onPress={() => setInfoVisible(true)}>
          Info
        </Button>
      </View>

      <Toast 
        type="success"
        visible={successVisible}
        message="✓ 저장되었습니다"
        onDismiss={() => setSuccessVisible(false)}
      />
      
      <Toast 
        type="error"
        visible={errorVisible}
        message="✕ 오류가 발생했습니다"
        onDismiss={() => setErrorVisible(false)}
      />
      
      <Toast 
        type="warning"
        visible={warningVisible}
        message="⚠ 주의가 필요합니다"
        onDismiss={() => setWarningVisible(false)}
      />
      
      <Toast 
        type="info"
        visible={infoVisible}
        message="ℹ 새로운 알림이 있습니다"
        onDismiss={() => setInfoVisible(false)}
      />
    </>
  );
};

export const BOKHAUSHealthSaved = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button size="large" fullWidth onPress={() => setVisible(true)}>
        건강 기록 저장
      </Button>
      <Toast 
        type="success"
        visible={visible}
        message="건강 기록이 저장되었습니다"
        onDismiss={() => setVisible(false)}
        duration={3000}
      />
    </>
  );
};

export const BOKHAUSMedicineReminder = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button size="large" fullWidth onPress={() => setVisible(true)}>
        복약 알림
      </Button>
      <Toast 
        type="warning"
        visible={visible}
        message="오전 8시 약 복용 시간입니다"
        onDismiss={() => setVisible(false)}
        actionLabel="확인"
        onActionPress={() => {
          alert('복약 완료');
          setVisible(false);
        }}
        duration={5000}
      />
    </>
  );
};
