var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/index.js']
  },
  target: 'electron-main',
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: 'bundle.js',
    publicPath: path.join(__dirname,'public/build/') // change in production to '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/env", 
              "@babel/react"
            ]
          },
        }
      },
      { 
        test: /\.s?css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
                modules: true, // default is false
                sourceMap: true,
                importLoaders: 1,
                localIdentName: "[name]--[local]--[hash:base64:8]",
            }
          }, 
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader', options: { javascriptEnabled: true }
          }
        ]
      }
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html'
    })
  ]
}