module.exports = (api) => {
  const babelEnv = api.env();

  const isProduction = babelEnv === 'production';

  const presets = [
    ['@babel/preset-env'], '@babel/preset-react',
  ];

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ];

  if (isProduction) {
    plugins.push(
      'transform-react-remove-prop-types',
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-react-inline-elements',
    );
  }

  const overrides = [];

  return {
    overrides,
    presets,
    plugins,
  };
};
