/**
 * Form Components Tests — Checkbox, RadioGroup, Switch
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Checkbox, RadioGroup, Switch } from './Form';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PaperProvider>{children}</PaperProvider>
);

// ─── Checkbox ─────────────────────────────────

describe('Checkbox', () => {
  it('레이블 렌더링', () => {
    const { getByText } = render(
      <Checkbox label="복약 동의" checked={false} onChange={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(getByText('복약 동의')).toBeTruthy();
  });

  it('onChange 호출 (unchecked → checked)', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Checkbox label="동의" checked={false} onChange={onChange} />,
      { wrapper: Wrapper }
    );
    fireEvent.press(getByText('동의'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('onChange 호출 (checked → unchecked)', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Checkbox label="동의" checked={true} onChange={onChange} />,
      { wrapper: Wrapper }
    );
    fireEvent.press(getByText('동의'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('disabled 시 onChange 미호출', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Checkbox label="비활성" checked={false} onChange={onChange} disabled />,
      { wrapper: Wrapper }
    );
    fireEvent.press(getByText('비활성'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('에러 메시지 표시', () => {
    const { getByText } = render(
      <Checkbox label="필수 동의" checked={false} onChange={jest.fn()} error errorText="필수 항목입니다" />,
      { wrapper: Wrapper }
    );
    expect(getByText('필수 항목입니다')).toBeTruthy();
  });
});

// ─── RadioGroup ───────────────────────────────

describe('RadioGroup', () => {
  const options = [
    { label: '매일', value: 'daily' },
    { label: '주간', value: 'weekly' },
    { label: '월간', value: 'monthly' },
  ];

  it('옵션 렌더링', () => {
    const { getByText } = render(
      <RadioGroup options={options} value="daily" onChange={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(getByText('매일')).toBeTruthy();
    expect(getByText('주간')).toBeTruthy();
  });

  it('선택 시 onChange 호출', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <RadioGroup options={options} value="daily" onChange={onChange} />,
      { wrapper: Wrapper }
    );
    fireEvent.press(getByText('주간'));
    expect(onChange).toHaveBeenCalledWith('weekly');
  });

  it('그룹 레이블 렌더링', () => {
    const { getByText } = render(
      <RadioGroup options={options} value="daily" onChange={jest.fn()} label="알림 주기" />,
      { wrapper: Wrapper }
    );
    expect(getByText('알림 주기')).toBeTruthy();
  });
});

// ─── Switch ───────────────────────────────────

describe('Switch', () => {
  it('레이블 렌더링', () => {
    const { getByText } = render(
      <Switch label="복약 알림" value={false} onValueChange={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(getByText('복약 알림')).toBeTruthy();
  });

  it('설명 텍스트 렌더링', () => {
    const { getByText } = render(
      <Switch label="복약 알림" description="매일 오전 8시" value={true} onValueChange={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(getByText('매일 오전 8시')).toBeTruthy();
  });

  it('토글 시 onValueChange 호출', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Switch label="알림" value={false} onValueChange={onValueChange} />,
      { wrapper: Wrapper }
    );
    fireEvent.press(getByText('알림'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('disabled 시 onValueChange 미호출', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Switch label="비활성" value={false} onValueChange={onValueChange} disabled />,
      { wrapper: Wrapper }
    );
    fireEvent.press(getByText('비활성'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
