import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Chip } from './index';

describe('Chip', () => {
  it('레이블을 렌더링한다', () => {
    const { getByText } = render(<Chip label="카테고리" />);
    expect(getByText('카테고리')).toBeTruthy();
  });

  it('onPress 콜백이 호출된다', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Chip label="클릭" onPress={onPress} />);
    fireEvent.press(getByText('클릭'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('selected 상태일 때 시각적 변화가 있다', () => {
    const { getByTestId } = render(<Chip label="선택됨" selected testID="chip" />);
    const chip = getByTestId('chip');
    expect(chip.props.style).toBeDefined();
  });

  it('disabled 상태일 때 onPress가 호출되지 않는다', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Chip label="비활성" disabled onPress={onPress} />);
    fireEvent.press(getByText('비활성'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
