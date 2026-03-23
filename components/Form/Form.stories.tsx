/**
 * Form Storybook Stories (Checkbox, Radio, Switch)
 * CSF 3.0 format for Storybook 7+
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox, RadioGroup, Switch } from './Form';
import Typography from '../Typography/Typography';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Form',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ── Checkbox ──────────────────────────────────────────
export const CheckboxDefault: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <View style={{ padding: 16 }}>
        <Checkbox
          label="개인정보 수집에 동의합니다"
          checked={checked}
          onChange={setChecked}
        />
      </View>
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [items, setItems] = useState([
      { label: '건강 체크 알림', checked: true },
      { label: '투약 알림', checked: true },
      { label: '방문 일정 알림', checked: false },
      { label: '응급 알림', checked: true },
    ]);
    const toggle = (i: number) => setItems(prev => prev.map((item, idx) => idx === i ? { ...item, checked: !item.checked } : item));
    return (
      <View style={{ padding: 16, gap: 8 }}>
        <Typography variant="heading3">알림 설정</Typography>
        {items.map((item, i) => (
          <Checkbox key={i} label={item.label} checked={item.checked} onChange={() => toggle(i)} />
        ))}
      </View>
    );
  },
};

// ── RadioGroup ─────────────────────────────────────────
export const RadioDefault: Story = {
  render: () => {
    const [value, setValue] = useState('normal');
    return (
      <View style={{ padding: 16 }}>
        <RadioGroup
          label="건강 상태"
          value={value}
          onChange={setValue}
          options={[
            { label: '정상', value: 'normal' },
            { label: '주의', value: 'caution' },
            { label: '위험', value: 'danger' },
          ]}
        />
      </View>
    );
  },
};

// ── Switch ──────────────────────────────────────────────
export const SwitchDefault: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <View style={{ padding: 16 }}>
        <Switch label="긴급 알림 활성화" value={on} onValueChange={setOn} />
      </View>
    );
  },
};

// ── BOKHAUS 예시 ────────────────────────────────────────
export const BOKHAUSConsentForm: Story = {
  render: () => {
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);
    const [agree3, setAgree3] = useState(false);
    const [emergency, setEmergency] = useState(true);

    return (
      <View style={{ padding: 16, gap: 20, maxWidth: 400 }}>
        <Typography variant="heading2">서비스 등록</Typography>

        <View style={{ gap: 12 }}>
          <Typography variant="heading3">동의 항목</Typography>
          <Checkbox label="개인정보 수집·이용 동의 (필수)" checked={agree1} onChange={setAgree1} required />
          <Checkbox label="건강정보 제공 동의 (필수)" checked={agree2} onChange={setAgree2} required />
          <Checkbox label="마케팅 정보 수신 동의 (선택)" checked={agree3} onChange={setAgree3} />
        </View>

        <View style={{ gap: 12 }}>
          <Typography variant="heading3">알림 설정</Typography>
          <Switch label="긴급 상황 즉시 알림" value={emergency} onValueChange={setEmergency} />
        </View>

        <Button
          variant="filled"
          size="large"
          fullWidth
          disabled={!agree1 || !agree2}
        >
          등록 완료
        </Button>
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'BOKHAUS 입소자 등록 폼. 필수 동의 항목 + 긴급 알림 설정.',
      },
    },
  },
};
