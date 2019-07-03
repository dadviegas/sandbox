import WebpackConfGen from 'core-webpack-setup';

const baseConfig = {
  rootPath: __dirname,
};

export default (env, params) => WebpackConfGen(env, params, baseConfig);
