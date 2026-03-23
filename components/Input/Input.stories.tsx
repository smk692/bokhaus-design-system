/**
 * Input Storybook Stories
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Input from './Input';
import theme from '../../build/react-native/theme';

export default {
  title: 'Components/Input',
  component: Input,
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

export const Basic = () => {
  const [value, setValue] = useState('');
  return (
    <Input 
      label="이름" 
      value={value}
      onChangeText={setValue}
    />
  );
};

export const WithPlaceholder = () => {
  const [value, setValue] = useState('');
  return (
    <Input 
      label="이메일" 
      placeholder="example@email.com"
      value={value}
      onChangeText={setValue}
    />
  );
};

export const Required = () => {
  const [value, setValue] = useState('');
  return (
    <Input 
      label="비밀번호" 
      placeholder="8자 이상"
      required
      secureTextEntry
      value={value}
      onChangeText={setValue}
    />
  );
};

export const WithHelperText = () => {
  const [value, setValue] = useState('');
  return (
    <Input 
      label="전화번호" 
      placeholder="010-0000-0000"
      helperText="하이픈(-) 없이 숫자만 입력하세요"
      value={value}
      onChangeText={setValue}
    />
  );
};

export const WithError = () => {
  const [value, setValue] = useState('abc');
  return (
    <Input 
      label="이메일" 
      placeholder="example@email.com"
      value={value}
      onChangeText={setValue}
      errorText="유효한 이메일 주소가 아닙니다"
    />
  );
};

export const Disabled = () => {
  return (
    <Input 
      label="이름" 
      value="홍길동"
      disabled
    />
  );
};

export const Multiline = () => {
  const [value, setValue] = useState('');
  return (
    <Input 
      label="메모" 
      placeholder="내용을 입력하세요"
      multiline
      numberOfLines={4}
      value={value}
      onChangeText={setValue}
    />
  );
};

export const BOKHAUSLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !text.includes('@')) {
      setEmailError('유효한 이메일 주소가 아닙니다');
    } else {
      setEmailError('');
    }
  };

  return (
    <View style={{ gap: 24 }}>
      <Input 
        label="이메일" 
        placeholder="example@email.com"
        required
        value={email}
        onChangeText={validateEmail}
        errorText={emailError}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input 
        label="비밀번호" 
        placeholder="8자 이상"
        required
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        helperText="영문, 숫자, 특수문자 조합 8자 이상"
      />
    </View>
  );
};

export const BOKHAUSHealthForm = () => {
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [memo, setMemo] = useState('');

  return (
    <View style={{ gap: 24 }}>
      <Input 
        label="혈압" 
        placeholder="120/80"
        required
        value={bloodPressure}
        onChangeText={setBloodPressure}
        helperText="수축기/이완기 혈압을 입력하세요 (예: 120/80)"
        keyboardType="numeric"
      />
      
      <Input 
        label="혈당" 
        placeholder="95"
        required
        value={bloodSugar}
        onChangeText={setBloodSugar}
        helperText="공복 혈당을 입력하세요 (단위: mg/dL)"
        keyboardType="numeric"
      />
      
      <Input 
        label="메모" 
        placeholder="특이사항을 기록하세요"
        multiline
        numberOfLines={4}
        value={memo}
        onChangeText={setMemo}
      />
    </View>
  );
};
