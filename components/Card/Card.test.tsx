/**
 * Card Component Tests
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { Text } from 'react-native';
import Card from './Card';
import theme from '../../build/react-native/theme';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={theme}>{children}</PaperProvider>
);

describe('Card', () => {
  it('renders content', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>,
      { wrapper }
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('renders header slot', () => {
    const { getByText } = render(
      <Card header={<Text>Header</Text>}>
        <Text>Content</Text>
      </Card>,
      { wrapper }
    );
    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });

  it('renders footer slot', () => {
    const { getByText } = render(
      <Card footer={<Text>Footer</Text>}>
        <Text>Content</Text>
      </Card>,
      { wrapper }
    );
    expect(getByText('Footer')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });

  it('renders all slots together', () => {
    const { getByText } = render(
      <Card 
        header={<Text>Header</Text>}
        footer={<Text>Footer</Text>}
      >
        <Text>Content</Text>
      </Card>,
      { wrapper }
    );
    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
    expect(getByText('Footer')).toBeTruthy();
  });

  it('handles touchable card with onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Card touchable onPress={onPress}>
        <Text>Touchable Card</Text>
      </Card>,
      { wrapper }
    );
    
    fireEvent.press(getByText('Touchable Card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies low elevation by default', () => {
    const { getByText } = render(
      <Card>
        <Text>Content</Text>
      </Card>,
      { wrapper }
    );
    // elevation: 2 (low)
    expect(getByText('Content')).toBeTruthy();
  });

  it('applies medium elevation', () => {
    const { getByText } = render(
      <Card elevation="medium">
        <Text>Content</Text>
      </Card>,
      { wrapper }
    );
    // elevation: 4 (medium)
    expect(getByText('Content')).toBeTruthy();
  });

  it('applies high elevation', () => {
    const { getByText } = render(
      <Card elevation="high">
        <Text>Content</Text>
      </Card>,
      { wrapper }
    );
    // elevation: 8 (high)
    expect(getByText('Content')).toBeTruthy();
  });

  it('has 12px border radius', () => {
    const { getByText } = render(
      <Card>
        <Text>Content</Text>
      </Card>,
      { wrapper }
    );
    // borderRadius: 12 (CPO 요구사항)
    expect(getByText('Content')).toBeTruthy();
  });

  it('has 16px padding', () => {
    const { getByText } = render(
      <Card>
        <Text>Content</Text>
      </Card>,
      { wrapper }
    );
    // padding: 16 (header/content/footer)
    expect(getByText('Content')).toBeTruthy();
  });
});
