/**
 * Style Dictionary Configuration
 * 브랜드 토큰 → React Native TypeScript 변환
 */

const customFormats = require('./custom-formats');

module.exports = {
  format: customFormats,
  source: ['tokens/**/*.json'],
  platforms: {
    'react-native': {
      transformGroup: 'react-native',
      buildPath: 'build/react-native/',
      files: [
        {
          destination: 'colors.ts',
          format: 'typescript/es6-declarations',
          filter: {
            attributes: {
              category: 'color'
            }
          },
          options: {
            outputReferences: true
          }
        },
        {
          destination: 'typography.ts',
          format: 'typescript/es6-declarations',
          filter: {
            attributes: {
              category: 'typography'
            }
          }
        },
        {
          destination: 'spacing.ts',
          format: 'typescript/es6-declarations',
          filter: {
            attributes: {
              category: 'spacing'
            }
          }
        },
        {
          destination: 'icon.ts',
          format: 'typescript/es6-declarations',
          filter: {
            attributes: {
              category: 'icon'
            }
          }
        },
        {
          destination: 'index.ts',
          format: 'typescript/module-declarations',
          options: {
            outputReferences: true
          }
        },
        {
          destination: 'theme.ts',
          format: 'typescript/react-native-theme'
        }
      ],
      transforms: [
        'attribute/cti',
        'name/cti/camel',
        'size/pxToRem',
        'color/hex'
      ]
    },
    figma: {
      transformGroup: 'web',
      buildPath: 'build/figma/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    }
  }
};
