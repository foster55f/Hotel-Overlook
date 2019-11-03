const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    manager: './src/manager-deck.js',
    user: './src/user-deck.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  // CSS and file (image) loaders
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images/',
                  publicPath: 'images/'
                }
              }
            ]
      }
    ],
  },
  // Below is needed for webpack-dev-server
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'manager-deck.html',
      template: './src/manager-deck.html',
      chunks: ['manager'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'user-deck.html',
      template: './src/user-deck.html',
      chunks: ['user'],
      inject: true
    })
  ],
  devServer: {
         contentBase: './dist'
  }
};