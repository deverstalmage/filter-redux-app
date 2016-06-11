var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [__dirname + '/src', __dirname + '/data'],
      loaders: ['react-hot', 'jsx', 'babel']
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },
  resolve: {
    root: [__dirname + '/node_modules', __dirname + '/src', __dirname],
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      classNames: 'classnames',
    }),
  ]
};