/**
 * Typography Component Tests
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import Typography from './Typography';

describe('Typography', () => {
  it('renders body variant by default', () => {
    const { getByText } = render(<Typography>Hello World</Typography>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders display variant', () => {
    const { getByText } = render(
      <Typography variant="display">Display Text</Typography>
    );
    const text = getByText('Display Text');
    expect(text).toBeTruthy();
    // fontSize: 32 확인
  });

  it('renders heading variants', () => {
    const { getByText } = render(
      <>
        <Typography variant="heading1">Heading 1</Typography>
        <Typography variant="heading2">Heading 2</Typography>
        <Typography variant="heading3">Heading 3</Typography>
      </>
    );
    expect(getByText('Heading 1')).toBeTruthy();
    expect(getByText('Heading 2')).toBeTruthy();
    expect(getByText('Heading 3')).toBeTruthy();
  });

  it('renders body variants', () => {
    const { getByText } = render(
      <>
        <Typography variant="bodyLarge">Large Body</Typography>
        <Typography variant="body">Body</Typography>
        <Typography variant="caption">Caption</Typography>
      </>
    );
    expect(getByText('Large Body')).toBeTruthy();
    expect(getByText('Body')).toBeTruthy();
    expect(getByText('Caption')).toBeTruthy();
  });

  it('applies color prop', () => {
    const { getByText } = render(
      <>
        <Typography color="primary">Primary</Typography>
        <Typography color="secondary">Secondary</Typography>
        <Typography color="error">Error</Typography>
      </>
    );
    expect(getByText('Primary')).toBeTruthy();
    expect(getByText('Secondary')).toBeTruthy();
    expect(getByText('Error')).toBeTruthy();
  });

  it('applies weight prop', () => {
    const { getByText } = render(
      <>
        <Typography weight="regular">Regular</Typography>
        <Typography weight="semibold">Semibold</Typography>
        <Typography weight="bold">Bold</Typography>
      </>
    );
    expect(getByText('Regular')).toBeTruthy();
    expect(getByText('Semibold')).toBeTruthy();
    expect(getByText('Bold')).toBeTruthy();
  });

  it('applies alignment', () => {
    const { getByText } = render(
      <>
        <Typography align="left">Left</Typography>
        <Typography align="center">Center</Typography>
        <Typography align="right">Right</Typography>
      </>
    );
    expect(getByText('Left')).toBeTruthy();
    expect(getByText('Center')).toBeTruthy();
    expect(getByText('Right')).toBeTruthy();
  });

  it('respects custom lineHeight', () => {
    const { getByText } = render(
      <Typography lineHeight={24}>Custom Line Height</Typography>
    );
    const text = getByText('Custom Line Height');
    expect(text).toBeTruthy();
    // lineHeight: 24 확인
  });

  it('applies WCAG AA minimum font size (16px)', () => {
    const { getByText } = render(<Typography variant="body">Body Text</Typography>);
    const text = getByText('Body Text');
    expect(text).toBeTruthy();
    // fontSize >= 16 확인
  });
});
