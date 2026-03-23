const path = require('path');

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (webpackConfig) => {
    const mockIconPath = path.resolve(__dirname, '../__mocks__/vector-icons-mock.js');

    // React Native Web + peer deps aliases
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      'react-native$': 'react-native-web',
      // Safe area context mock for web
      'react-native-safe-area-context': path.resolve(
        __dirname,
        '../__mocks__/safe-area-context-mock.js'
      ),
      // Vector icons mocks
      'react-native-vector-icons/MaterialCommunityIcons': mockIconPath,
      '@expo/vector-icons/MaterialCommunityIcons': mockIconPath,
      '@expo/vector-icons': mockIconPath,
      '@react-native-vector-icons/material-design-icons': mockIconPath,
    };

    // Handle React Native extensions
    webpackConfig.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...(webpackConfig.resolve.extensions || []),
    ];

    // Add babel-loader for tsx/ts/jsx/js files
    webpackConfig.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: 'current' } }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    });

    return webpackConfig;
  },
};

module.exports = config;
