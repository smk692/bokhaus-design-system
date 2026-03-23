/**
 * Input Storybook Stories
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: '레이블 (필수)' },
    placeholder: { control: 'text', description: '플레이스홀더' },
    helperText: { control: 'text', description: 'Helper 텍스트' },
    errorText: { control: 'text', description: '에러 메시지' },
    required: { control: 'boolean', description: '필수 항목' },
    disabled: { control: 'boolean', description: '비활성' },
    secureTextEntry: { control: 'boolean', description: '비밀번호 입력' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

export const WithHelper: Story = {
  args: {
    label: '전화번호',
    placeholder: '010-0000-0000',
    helperText: '보호자 연락처로 사용됩니다',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    value: 'invalid-email',
    errorText: '올바른 이메일 형식을 입력하세요',
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    secureTextEntry: true,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '등록일',
    value: '2024-01-15',
    disabled: true,
  },
};

export const BOKHAUSLoginForm: Story = {
  render: () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    return (
      <View style={{ gap: 16, padding: 16, maxWidth: 360 }}>
        <Input
          label="아이디"
          placeholder="아이디를 입력하세요"
          value={id}
          onChangeText={setId}
          required
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={pw}
          onChangeText={setPw}
          secureTextEntry
          required
        />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 로그인 폼 예시. 56px 높이, 레이블 항상 상단 표시.',
      },
    },
  },
};
