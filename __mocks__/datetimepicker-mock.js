/**
 * @react-native-community/datetimepicker mock for Storybook web
 * 네이티브 DateTimePicker는 웹에서 사용 불가 → 빈 컴포넌트로 대체
 */
import React from 'react';
import { View } from 'react-native';

const DateTimePicker = (props) => {
  return React.createElement(View, { testID: 'datetimepicker-mock' });
};

export default DateTimePicker;
