const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

// Plugin para minificar os arquivos CSS e extrai-los para um diretorio particular
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
});