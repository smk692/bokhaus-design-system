import { Provider as PaperProvider } from 'react-native-paper';
import { View } from 'react-native';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAFAFA',
        },
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'dark',
          value: '#212121',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <PaperProvider>
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </PaperProvider>
    ),
  ],
};

export default preview;
