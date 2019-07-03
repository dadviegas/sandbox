module.exports = (api) => {
  console.log(2)
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
    {
      test: 'apps/*',
      extends: './apps/babel.config.js',
    },
    {
      test: 'utils/*',
      extends: './utils/babel.config.js',
    },
  ];

  return {
    overrides,
    presets,
    plugins,
  };
};
