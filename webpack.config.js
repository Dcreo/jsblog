const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ['./assets/javascripts/app.js', './assets/stylesheets/app.sass']
  },
  output: {
    filename: 'javascripts/[name].js',
    path: path.resolve(__dirname, 'public/')
  },
  module: {
    rules: [
      {
        test: /\.(ttf|woff2|woff|eot|svg|dtd)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'files/'
        }
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'stylesheets/[name].css',
    })
  ]
}
