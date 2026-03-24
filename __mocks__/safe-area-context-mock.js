// React Native Safe Area Context mock for Storybook Web
const React = require('react');

// SafeAreaInsetsContext — react-native-paper의 SafeAreaProviderCompat가 사용
const defaultInsets = { top: 0, right: 0, bottom: 0, left: 0 };
const SafeAreaInsetsContext = React.createContext(defaultInsets);
const SafeAreaFrameContext = React.createContext({ x: 0, y: 0, width: 375, height: 812 });

const SafeAreaProvider = ({ children }) => {
  return React.createElement(
    SafeAreaInsetsContext.Provider,
    { value: defaultInsets },
    children
  );
};

const SafeAreaConsumer = ({ children }) => {
  return React.createElement(
    SafeAreaInsetsContext.Consumer,
    null,
    children
  );
};

const SafeAreaView = ({ children, style }) => React.createElement('div', { style }, children);

const useSafeAreaInsets = () => defaultInsets;
const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 375, height: 812 });
const useCurrentSafeAreaInsets = () => defaultInsets;

const initialWindowMetrics = {
  insets: defaultInsets,
  frame: { x: 0, y: 0, width: 375, height: 812 },
};

// initialMetrics — SafeAreaProviderCompat.initialMetrics로 사용됨
const initialMetrics = initialWindowMetrics;

module.exports = {
  SafeAreaProvider,
  SafeAreaConsumer,
  SafeAreaView,
  SafeAreaInsetsContext,
  SafeAreaFrameContext,
  useSafeAreaInsets,
  useSafeAreaFrame,
  useCurrentSafeAreaInsets,
  initialWindowMetrics,
  initialMetrics,
};
