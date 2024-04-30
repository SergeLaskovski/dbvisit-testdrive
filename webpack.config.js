const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPligin = require("css-minimizer-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  const config = {
    mode: 'development',
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        },
        {
          test: /\.(scss|css)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|woff2|svg|mp4)$/i,
          exclude: /node_modules/,
          type: "asset"
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html")
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:10].min.css",
        chunkFilename: "css/chunk-[contenthash:10].min.css"
      }),
      new Dotenv({
        path: `./env/.env.${env.envfile}`,
      }),
      env.envfile === 'prod' ? new BundleAnalyzerPlugin() : ''
    ],
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, './dist/'),
      filename: 'js/[name].[contenthash:10].min.js',
      chunkFilename: 'js/chunk-[contenthash:10].min.js',
      assetModuleFilename: 'assets/[name][ext]',
      clean: true
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          video: {
            test: /[\\/]node_modules[\\/](video.js)[\\/]/,
            name: 'video',
            chunks: 'all',
          },
          vendor: {
            test: /[\\/]node_modules[\\/](?!video)(.[a-zA-Z0-9.\-_]+)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          }
        },
      },
      minimize: true,
      minimizer: [
        new CssMinimizerPligin()
      ]
    },
    target: 'web',
    devServer: {
      static: path.resolve(__dirname, './dist/'),
      hot: true,
      historyApiFallback: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://testdrive-api.dbvisit.net',
          secure: false,
        },
      }
    }
  }
  return config;
};
