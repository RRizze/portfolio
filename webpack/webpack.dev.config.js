const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.config');

module.exports = merge(
  base,
  {
    devServer: {
      port: 3003,
      compress: true,
    },
  },
  {
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer'),
                ]),
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
  },
);