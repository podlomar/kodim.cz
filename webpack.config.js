import path from 'path';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { StatsWriterPlugin } from "webpack-stats-plugin";
import json5 from 'json5';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const serverConfig = {
  entry: './src/server/server.tsx',
  mode: 'development',
  devtool: false,
  target: "es2017",
  output: {
    path: path.resolve("./dist"),
    filename: 'server.js',
    publicPath: '/',
    module: true,
    chunkFormat: "module",
  },
  resolve: {
    modules: ['src/server', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: [
    nodeExternals({
      importType: "module",
      allowlist: [
        // Until React 17.0.3 is released with proper exports
        "react/jsx-runtime",
        "react-router",
        "history",
        "react-router-dom",
        "react-router-dom/server.js",
      ]
    }),
    {
      // Until React 17.0.3 is released with proper exports
      "react/jsx-runtime": "react/jsx-runtime.js",
    }
  ],
  externalsPresets: { node: true },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true,
          }
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                'src/server/resources/vars.scss',
                'src/server/resources/mixins.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name]-[contenthash:6][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/style.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/server/assets',
          to: 'assets',
        },
        {
          from: 'server-config.json5',
          to: 'server-config.json5',
        },
      ],
    }),
  ]
};

const clientConfig = {
  entry: './src/client/client.tsx',
  mode: 'development',
  output: {
    path: path.resolve("./dist"),
    filename: 'js/bundle-[contenthash:6].js',
    publicPath: '/',
  },
  resolve: {
    modules: ['src/client', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
            }
          },
        ],
      },
      {
        test: /\.(scss|png|jpe?g|svg)$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    // new webpack.IgnorePlugin({
    //   resourceRegExp: /\.(scss|png|jpe?g|svg)$/,
    // }),
    // new BundleAnalyzerPlugin(),
    new StatsWriterPlugin({
      filename: "stats.json5",
      transform(data) {
        return json5.stringify({
          bundle: data.assetsByChunkName.main[0],
        }, null, 2);
      }
    })
  ]
};

export default [clientConfig, serverConfig];
