module.exports = (api) => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env'],
  ];
  const plugins = [];
  const overrides = [];
  return {
    overrides,
    presets,
    plugins,
  };
};
