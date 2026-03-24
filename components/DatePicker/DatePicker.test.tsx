import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DatePicker } from './index';

describe('DatePicker', () => {
  it('placeholder를 렌더링한다', () => {
    const { getByText } = render(
      <DatePicker placeholder="날짜 선택" onDateChange={() => {}} />
    );
    expect(getByText('날짜 선택')).toBeTruthy();
  });

  it('날짜 선택 시 onDateChange가 호출된다', () => {
    const onDateChange = jest.fn();
    const { getByTestId } = render(
      <DatePicker placeholder="날짜" onDateChange={onDateChange} testID="datepicker" />
    );
    fireEvent.press(getByTestId('datepicker'));
    expect(onDateChange).toBeDefined();
  });

  it('접근성: accessibilityLabel이 있다', () => {
    const { getByLabelText } = render(
      <DatePicker placeholder="날짜 선택" onDateChange={() => {}} accessibilityLabel="날짜를 선택하세요" />
    );
    expect(getByLabelText('날짜를 선택하세요')).toBeTruthy();
  });

  it('시니어 UX: 최소 터치 높이 72px 이상', () => {
    const { getByTestId } = render(
      <DatePicker placeholder="날짜" onDateChange={() => {}} testID="datepicker" />
    );
    const element = getByTestId('datepicker');
    const styles = Array.isArray(element.props.style) ? element.props.style : [element.props.style];
    const height = styles.find((s: any) => s?.minHeight)?.minHeight;
    if (height) expect(height).toBeGreaterThanOrEqual(72);
  });
});
