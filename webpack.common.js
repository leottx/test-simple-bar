// Cria o arquivo HTML para servir ao bundle
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Remove todos os arquivos previamente existes do diretorio de saida
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Remove todos os comentarios do bundle e previne a criacao do arquivo licence.txt
const TerserPlugin = require('terser-webpack-plugin');

// Traduz os paths dos arquivos para compatibilidade em qualquer sistema operacional
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};