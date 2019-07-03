import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const autoprefixer = require('autoprefixer');

const getPath = (...args) => path.join(...args);

const rootPath = process.cwd();

const baseConfig = {
  rootPath,
  stats: {
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true,
    colors: true,
    version: true,
    performance: true,
    outputPath: true,
    entrypoints: true,
    builtAt: true,
    children: true,
    assets: true,
  },
};

export default (env, params, config = baseConfig) => {
  const isProduction = process.env.NODE_ENV !== 'production';

  return {
    watchOptions: {
      ignored: /node_modules/,
    },
    optimization: {
      moduleIds: 'hashed',
      namedChunks: isProduction,
      namedModules: isProduction,
      minimize: isProduction,
      runtimeChunk: {
        name: entrypoint => `runtime_${entrypoint.name}`,
      },
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: /node_modules/,
            enforce: true,
          },
          // styles: {
          //   name: 'styles',
          //   test: /\.s?css$/,
          //   chunks: 'all',
          //   enforce: true,
          // },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Custom template',
        template: getPath(config.rootPath, 'html/index.template.html'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name]_[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isProduction,
                reloadAll: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              query: { plugins: [autoprefixer] },
            },
            {
              loader: 'sass-loader',
            },
          ].filter(n => n),
        },
      ],
    },
    devServer: {
      contentBase: getPath(config.rootPath, 'dist'),
      compress: true,
      port: 8081,
    },
    stats: config.stats,
  };
};
