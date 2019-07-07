import webpackConfGen from 'core-webpack-setup';

const baseConfig = {
  rootPath: __dirname,
  css: {
    type: 'BUNDLE'
  }
};

export default webpackConfGen(baseConfig);
