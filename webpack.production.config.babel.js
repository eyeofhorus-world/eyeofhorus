
import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies

export default {
  output: {
    filename: 'client-bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /.(png|jpg|gif)$/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ 
      minimize: true,
      comments: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true,
        sequences: true,
        booleans: true,
      },
    }),
  ],
};
