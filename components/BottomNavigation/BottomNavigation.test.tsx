import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BottomNavigation } from './index';

const mockTabs = [
  { key: 'home',    label: '홈',    icon: 'home'    },
  { key: 'profile', label: '프로필', icon: 'person'  },
  { key: 'settings',label: '설정',  icon: 'settings' },
];

describe('BottomNavigation', () => {
  it('탭 목록을 렌더링한다', () => {
    const { getByText } = render(
      <BottomNavigation tabs={mockTabs} activeKey="home" onTabPress={() => {}} />
    );
    expect(getByText('홈')).toBeTruthy();
    expect(getByText('프로필')).toBeTruthy();
    expect(getByText('설정')).toBeTruthy();
  });

  it('탭 클릭 시 onTabPress가 호출된다', () => {
    const onTabPress = jest.fn();
    const { getByText } = render(
      <BottomNavigation tabs={mockTabs} activeKey="home" onTabPress={onTabPress} />
    );
    fireEvent.press(getByText('프로필'));
    expect(onTabPress).toHaveBeenCalledWith('profile');
  });

  it('접근성: 각 탭에 accessibilityRole="button"이 있다', () => {
    const { getAllByRole } = render(
      <BottomNavigation tabs={mockTabs} activeKey="home" onTabPress={() => {}} />
    );
    expect(getAllByRole('button').length).toBeGreaterThanOrEqual(3);
  });
});
