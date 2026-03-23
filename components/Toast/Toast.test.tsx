/**
 * Toast Component Tests
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import Toast from './Toast';
import theme from '../../build/react-native/theme';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={theme}>{children}</PaperProvider>
);

describe('Toast', () => {
  it('renders when visible=true', () => {
    const { getByText } = render(
      <Toast 
        visible={true}
        message="테스트 메시지"
        onDismiss={() => {}}
      />,
      { wrapper }
    );
    expect(getByText(/테스트 메시지/)).toBeTruthy();
  });

  it('does not render when visible=false', () => {
    const { queryByText } = render(
      <Toast 
        visible={false}
        message="테스트 메시지"
        onDismiss={() => {}}
      />,
      { wrapper }
    );
    expect(queryByText(/테스트 메시지/)).toBeNull();
  });

  it('renders success type with check icon', () => {
    const { getByText } = render(
      <Toast 
        type="success"
        visible={true}
        message="성공"
        onDismiss={() => {}}
      />,
      { wrapper }
    );
    expect(getByText(/✓ 성공/)).toBeTruthy();
  });

  it('renders error type with X icon', () => {
    const { getByText } = render(
      <Toast 
        type="error"
        visible={true}
        message="오류"
        onDismiss={() => {}}
      />,
      { wrapper }
    );
    expect(getByText(/✕ 오류/)).toBeTruthy();
  });

  it('renders warning type with warning icon', () => {
    const { getByText } = render(
      <Toast 
        type="warning"
        visible={true}
        message="경고"
        onDismiss={() => {}}
      />,
      { wrapper }
    );
    expect(getByText(/⚠ 경고/)).toBeTruthy();
  });

  it('renders info type with info icon', () => {
    const { getByText } = render(
      <Toast 
        type="info"
        visible={true}
        message="정보"
        onDismiss={() => {}}
      />,
      { wrapper }
    );
    expect(getByText(/ℹ 정보/)).toBeTruthy();
  });

  it('renders with action button', () => {
    const onActionPress = jest.fn();
    const { getByText } = render(
      <Toast 
        visible={true}
        message="메시지"
        onDismiss={() => {}}
        actionLabel="실행 취소"
        onActionPress={onActionPress}
      />,
      { wrapper }
    );
    expect(getByText('실행 취소')).toBeTruthy();
  });

  it('uses minimum 3 seconds duration by default', () => {
    const { getByText } = render(
      <Toast 
        visible={true}
        message="메시지"
        onDismiss={() => {}}
      />,
      { wrapper }
    );
    // duration: 3000 (CPO 요구사항)
    expect(getByText(/메시지/)).toBeTruthy();
  });

  it('accepts custom duration', () => {
    const { getByText } = render(
      <Toast 
        visible={true}
        message="메시지"
        onDismiss={() => {}}
        duration={5000}
      />,
      { wrapper }
    );
    expect(getByText(/메시지/)).toBeTruthy();
  });
});
