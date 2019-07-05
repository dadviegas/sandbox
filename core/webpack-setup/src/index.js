import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import autoprefixer from 'autoprefixer';
import merge from 'merge';

const getPath = (...args) => path.join(...args);

const rootPath = process.cwd();

export const CSS_PACKAGES = {
  BUNDLE: 'BUNDLE',
  CSS: 'CSS',
};

const baseConfig = {
  rootPath,
  css: {
    className: '[name]__[local]--[hash:base64:5]',
    type: CSS_PACKAGES.CSS,
  },
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

// eslint-disable-next-line no-unused-vars
export default (projConfig = {}) => (env = {}, params) => {
  const environment = params.mode || 'development';
  const isProduction = environment !== 'production';

  const config = merge.recursive(true, baseConfig, projConfig);

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
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(environment) }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Custom template',
        template: getPath(config.rootPath, 'html/index.template.html'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
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
              options: { minimize: false },
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            config.css.type === CSS_PACKAGES.CSS && {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProduction,
                reloadAll: true,
              },
            },
            config.css.type === CSS_PACKAGES.BUNDLE && {
              loader: 'style-loader',
              options: {
                hmr: !isProduction,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: config.css.className,
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
        {
          test: /\.(svg|eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
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
