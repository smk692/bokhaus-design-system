// React Native Safe Area Context mock for Storybook Web
const React = require('react');

const SafeAreaProvider = ({ children }) => children;
const SafeAreaConsumer = ({ children }) => children({ top: 0, right: 0, bottom: 0, left: 0 });
const SafeAreaView = ({ children, style }) => React.createElement('div', { style }, children);

const useSafeAreaInsets = () => ({ top: 0, right: 0, bottom: 0, left: 0 });
const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 375, height: 812 });
const useCurrentSafeAreaInsets = () => ({ top: 0, right: 0, bottom: 0, left: 0 });

const initialWindowMetrics = { insets: { top: 0, right: 0, bottom: 0, left: 0 }, frame: { x: 0, y: 0, width: 375, height: 812 } };

module.exports = {
  SafeAreaProvider,
  SafeAreaConsumer,
  SafeAreaView,
  useSafeAreaInsets,
  useSafeAreaFrame,
  useCurrentSafeAreaInsets,
  initialWindowMetrics,
};
