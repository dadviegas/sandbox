const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-proposal-class-properties'],
});
