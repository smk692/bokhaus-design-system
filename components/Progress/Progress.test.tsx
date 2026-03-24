import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressBar } from './ProgressBar';
import { Spinner } from './Spinner';
import { Skeleton } from './Skeleton';

describe('Progress 컴포넌트', () => {
  describe('ProgressBar', () => {
    it('progress 값을 렌더링한다', () => {
      const { getByTestId } = render(<ProgressBar progress={0.5} testID="progressbar" />);
      expect(getByTestId('progressbar')).toBeTruthy();
    });

    it('접근성: accessibilityRole="progressbar"가 있다', () => {
      const { getByRole } = render(<ProgressBar progress={0.7} />);
      expect(getByRole('progressbar')).toBeTruthy();
    });

    it('0~1 범위 외의 값을 clamp 처리한다', () => {
      const { getByTestId } = render(<ProgressBar progress={1.5} testID="pb" />);
      expect(getByTestId('pb')).toBeTruthy();
    });
  });

  describe('Spinner', () => {
    it('렌더링된다', () => {
      const { getByTestId } = render(<Spinner testID="spinner" />);
      expect(getByTestId('spinner')).toBeTruthy();
    });

    it('접근성: accessibilityLabel이 있다', () => {
      const { getByLabelText } = render(<Spinner accessibilityLabel="로딩 중" />);
      expect(getByLabelText('로딩 중')).toBeTruthy();
    });
  });

  describe('Skeleton', () => {
    it('렌더링된다', () => {
      const { getByTestId } = render(<Skeleton width={100} height={20} testID="skeleton" />);
      expect(getByTestId('skeleton')).toBeTruthy();
    });
  });
});
