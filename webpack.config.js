const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

function setupDevtool() {
  if (IS_DEV) return 'eval';
  if (IS_PROD) return false;
}

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, 'src/index.jsx'), 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bandle.js',
  },
  module: {
    rules: [{
      test: /\.[tj]sx$/,
      use: ['ts-loader'],
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
    },
    
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({template: path.resolve(__dirname, 'src/index.html')}),
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: IS_DEV,
  },
  devtool: setupDevtool(),
}