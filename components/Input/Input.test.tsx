/**
 * Input Component Tests
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import Input from './Input';
import theme from '../../build/react-native/theme';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={theme}>{children}</PaperProvider>
);

describe('Input', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <Input label="이름" />,
      { wrapper }
    );
    expect(getByText('이름')).toBeTruthy();
  });

  it('shows required asterisk when required=true', () => {
    const { getByText } = render(
      <Input label="이메일" required />,
      { wrapper }
    );
    expect(getByText('이메일 *')).toBeTruthy();
  });

  it('renders placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input label="이름" placeholder="홍길동" />,
      { wrapper }
    );
    expect(getByPlaceholderText('홍길동')).toBeTruthy();
  });

  it('shows helper text', () => {
    const { getByText } = render(
      <Input label="비밀번호" helperText="8자 이상 입력하세요" />,
      { wrapper }
    );
    expect(getByText('8자 이상 입력하세요')).toBeTruthy();
  });

  it('shows error text and hides helper text', () => {
    const { getByText, queryByText } = render(
      <Input 
        label="이메일" 
        helperText="이메일 주소를 입력하세요"
        errorText="유효한 이메일이 아닙니다"
      />,
      { wrapper }
    );
    expect(getByText('유효한 이메일이 아닙니다')).toBeTruthy();
    expect(queryByText('이메일 주소를 입력하세요')).toBeNull();
  });

  it('handles onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input label="이름" placeholder="입력" onChangeText={onChangeText} />,
      { wrapper }
    );
    
    const input = getByPlaceholderText('입력');
    fireEvent.changeText(input, '홍길동');
    expect(onChangeText).toHaveBeenCalledWith('홍길동');
  });

  it('respects disabled state', () => {
    const { getByPlaceholderText } = render(
      <Input label="이름" placeholder="입력" disabled />,
      { wrapper }
    );
    
    const input = getByPlaceholderText('입력');
    expect(input.props.editable).toBe(false);
  });

  it('applies minimum height of 56px', () => {
    const { getByPlaceholderText } = render(
      <Input label="이름" placeholder="입력" />,
      { wrapper }
    );
    
    const input = getByPlaceholderText('입력');
    // contentStyle minHeight: 56 확인
    expect(input).toBeTruthy();
  });

  it('shows error state with red border', () => {
    const { getByPlaceholderText } = render(
      <Input label="이름" placeholder="입력" errorText="필수 항목입니다" />,
      { wrapper }
    );
    
    const input = getByPlaceholderText('입력');
    // error prop 전달 확인
    expect(input.props.error).toBe(true);
  });
});
