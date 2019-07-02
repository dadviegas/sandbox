import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (env, params) => {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Custom template',
        template: path.join(__dirname, 'html/index.template.html'),
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
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8081,
    },
  };
};
