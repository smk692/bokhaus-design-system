/**
 * Badge Tests
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Badge } from './Badge';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe('Badge', () => {
  it('count 뱃지: 숫자 렌더링', () => {
    const { getByText } = render(<Badge count={5} />, { wrapper: Wrapper });
    expect(getByText('5')).toBeTruthy();
  });

  it('maxCount 초과 시 99+ 표시', () => {
    const { getByText } = render(<Badge count={150} maxCount={99} />, { wrapper: Wrapper });
    expect(getByText('99+')).toBeTruthy();
  });

  it('count=0 시 미표시 (기본)', () => {
    const { queryByText } = render(<Badge count={0} />, { wrapper: Wrapper });
    expect(queryByText('0')).toBeNull();
  });

  it('label 뱃지 텍스트', () => {
    const { getByText } = render(
      <Badge variant="label" label="NEW" />,
      { wrapper: Wrapper }
    );
    expect(getByText('NEW')).toBeTruthy();
  });

  it('visible=true 시 count=0이어도 표시', () => {
    const { getByText } = render(
      <Badge count={0} visible={true} />,
      { wrapper: Wrapper }
    );
    expect(getByText('0')).toBeTruthy();
  });
});
