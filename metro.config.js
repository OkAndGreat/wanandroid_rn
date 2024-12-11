
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
    resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

// metro.config.js
const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
    },
};

module.exports = wrapWithReanimatedMetroConfig(mergeConfig(defaultConfig, config));