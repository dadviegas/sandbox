module.exports = (api) => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env'],
  ];
  const plugins = [];
  const overrides = [
    {
      test: 'packages/*',
      extends: './packages/babel.config.js',
    },
    {
      test: 'core/*',
      extends: './core/babel.config.js',
    },
  ];
  return {
    overrides,
    presets,
    plugins,
  };
};
