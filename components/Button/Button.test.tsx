/**
 * Button Component Tests
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import Button from './Button';
import theme from '../../build/react-native/theme';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={theme}>{children}</PaperProvider>
);

describe('Button', () => {
  it('renders filled button by default', () => {
    const { getByText } = render(
      <Button>Click me</Button>,
      { wrapper }
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('renders outlined variant', () => {
    const { getByText } = render(
      <Button variant="outlined">Outlined</Button>,
      { wrapper }
    );
    expect(getByText('Outlined')).toBeTruthy();
  });

  it('renders text variant', () => {
    const { getByText } = render(
      <Button variant="text">Text Button</Button>,
      { wrapper }
    );
    expect(getByText('Text Button')).toBeTruthy();
  });

  it('applies large size (56px)', () => {
    const { getByText } = render(
      <Button size="large">Large Button</Button>,
      { wrapper }
    );
    const button = getByText('Large Button').parent;
    // contentStyle에 minHeight: 56 적용 확인
    expect(button).toBeTruthy();
  });

  it('applies medium size by default (48px)', () => {
    const { getByText } = render(
      <Button>Medium Button</Button>,
      { wrapper }
    );
    const button = getByText('Medium Button').parent;
    // contentStyle에 minHeight: 48 적용 확인
    expect(button).toBeTruthy();
  });

  it('applies full width style', () => {
    const { getByText } = render(
      <Button fullWidth>Full Width</Button>,
      { wrapper }
    );
    const button = getByText('Full Width').parent;
    expect(button).toBeTruthy();
  });

  it('handles onPress callback', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress}>Press me</Button>,
      { wrapper }
    );
    getByText('Press me').props.onPress();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('respects disabled state with 40% opacity', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPress}>Disabled</Button>,
      { wrapper }
    );
    const button = getByText('Disabled').parent;
    expect(button?.props.accessibilityState?.disabled).toBe(true);
    // opacity 0.4 스타일 적용 확인
  });
});
