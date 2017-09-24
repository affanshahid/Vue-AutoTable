const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              'env',
              {
                useBuiltins: false,
                targets: {
                  browsers: ["last 4 versions", "ie >= 9"]
                }
              }
            ],
            'react',
            'stage-2'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  devServer: {
    compress: true,
    clientLogLevel: 'none',
    contentBase: path.resolve(__dirname, 'public'),
    open: true,
    watchContentBase: true,
    quiet: true,
    hot: true,
    inline: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  }
};