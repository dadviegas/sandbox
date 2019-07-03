module.exports = (api) => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env'],
  ];

  const plugins = [
    ['@babel/plugin-proposal-class-properties'],
  ];
  const overrides = [];

  return {
    overrides,
    presets,
    plugins,
    ignore: ['**/*.test.js'],
  };
};
