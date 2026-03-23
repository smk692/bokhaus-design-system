/**
 * Button Storybook Stories
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: '버튼 변형',
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: '버튼 크기 (medium: 48px, large: 56px)',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 버튼',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
    },
    children: {
      control: 'text',
      description: '버튼 레이블',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '확인',
    variant: 'filled',
    size: 'medium',
  },
};

// 변형 (Filled, Outlined, Text)
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button variant="filled">Filled Button</Button>
      <Button variant="outlined">Outlined Button</Button>
      <Button variant="text">Text Button</Button>
    </div>
  ),
};

// 크기 (Medium 48px, Large 56px)
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button size="medium">Medium (48px)</Button>
      <Button size="large">Large (56px)</Button>
    </div>
  ),
};

// 전체 너비
export const FullWidth: Story = {
  args: {
    children: '전체 너비 버튼',
    fullWidth: true,
    size: 'large',
  },
};

// 아이콘 포함
export const WithIcon: Story = {
  args: {
    children: '사진 촬영',
    icon: 'camera',
    variant: 'filled',
  },
};

// 비활성 상태
export const Disabled: Story = {
  args: {
    children: '비활성 버튼',
    disabled: true,
  },
};

// 로딩 상태
export const Loading: Story = {
  args: {
    children: '로딩 중...',
    loading: true,
  },
};

// BOKHAUS 시니어 앱 예시
export const BOKHAUSExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Button variant="filled" size="large" fullWidth icon="login">
        로그인
      </Button>
      <Button variant="outlined" size="large" fullWidth icon="account-plus">
        회원가입
      </Button>
      <Button variant="text" icon="help-circle">
        비밀번호 찾기
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 시니어 앱에서 권장하는 버튼 사용 패턴입니다. size="large" (56px)를 기본으로 사용합니다.',
      },
    },
  },
};
