const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './index.html',
      }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env',
                        { 'plugins': ['@babel/plugin-proposal-class-properties']}]
          }
        },
      },
    ],
  },
};