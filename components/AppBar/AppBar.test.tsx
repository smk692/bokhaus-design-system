import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppBar } from './index';

describe('AppBar', () => {
  it('타이틀을 렌더링한다', () => {
    const { getByText } = render(<AppBar title="테스트 페이지" />);
    expect(getByText('테스트 페이지')).toBeTruthy();
  });

  it('뒤로가기 버튼이 있을 때 onBack 콜백이 호출된다', () => {
    const onBack = jest.fn();
    const { getByTestId } = render(<AppBar title="테스트" onBack={onBack} />);
    fireEvent.press(getByTestId('appbar-back-button'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('접근성: role="header" 속성이 있다', () => {
    const { getByRole } = render(<AppBar title="접근성 테스트" />);
    expect(getByRole('header')).toBeTruthy();
  });
});
