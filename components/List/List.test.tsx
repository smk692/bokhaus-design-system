/**
 * List / ListItem Tests
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { List, ListItem } from './List';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe('ListItem', () => {
  it('title 렌더링', () => {
    const { getByText } = render(
      <ListItem title="약 복용 기록" />,
      { wrapper: Wrapper }
    );
    expect(getByText('약 복용 기록')).toBeTruthy();
  });

  it('subtitle 렌더링', () => {
    const { getByText } = render(
      <ListItem title="혈압 측정" subtitle="오전 8:00" />,
      { wrapper: Wrapper }
    );
    expect(getByText('오전 8:00')).toBeTruthy();
  });

  it('onPress 클릭 호출', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ListItem title="클릭 아이템" onPress={onPress} />,
      { wrapper: Wrapper }
    );
    fireEvent.press(getByText('클릭 아이템'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disabled 시 onPress 미호출', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ListItem title="비활성 아이템" onPress={onPress} disabled />,
      { wrapper: Wrapper }
    );
    fireEvent.press(getByText('비활성 아이템'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('List', () => {
  const data = ['항목 1', '항목 2', '항목 3'];

  it('데이터 렌더링', () => {
    const { getByText } = render(
      <List
        data={data}
        renderItem={(item) => <ListItem title={item} />}
      />,
      { wrapper: Wrapper }
    );
    expect(getByText('항목 1')).toBeTruthy();
    expect(getByText('항목 3')).toBeTruthy();
  });

  it('빈 목록 텍스트', () => {
    const { getByText } = render(
      <List data={[]} renderItem={(item) => <ListItem title={item as string} />} emptyText="기록이 없습니다" />,
      { wrapper: Wrapper }
    );
    expect(getByText('기록이 없습니다')).toBeTruthy();
  });

  it('sectionTitle 렌더링', () => {
    const { getByText } = render(
      <List
        data={data}
        renderItem={(item) => <ListItem title={item} />}
        sectionTitle="오늘의 기록"
      />,
      { wrapper: Wrapper }
    );
    expect(getByText('오늘의 기록')).toBeTruthy();
  });
});
