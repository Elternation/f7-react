import webpack                 from 'webpack';
import path                    from 'path';
import MiniCssExtractPlugin    from 'mini-css-extract-plugin';
import HtmlWebpackPlugin       from 'html-webpack-plugin';
import CopyWebpackPlugin       from 'copy-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin          from 'uglifyjs-webpack-plugin';

import package_json            from './package.json';

const OUTPUT_PATH = path.resolve(__dirname, 'build');

let webpack_config = (env, options) => {
  const is_prod = options.mode === 'production';
  const public_path = is_prod ? '/static' : '';

  return {
    entry: {
      app: ['./src/index.js'],
    },
    devtool: is_prod ? undefined : 'source-map',
    output: {
      path: OUTPUT_PATH,
      filename: 'js/[name].js',
      publicPath: `${public_path}/`
    },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'env']
          }
        },
        {
          test  : /\.css$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test  : /\.scss$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test  : /\.css$/,
          exclude: [
            /src/
          ],
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test  : /\.scss$/,
          exclude: [
            /src/
          ],
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'media/[hash].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        },
        {
          test: /\.xml$/,
          loader: 'raw-loader'
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.css', '.scss'],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            enforce: true,
            priority: 1
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 2,
            name: 'vendors',
            enforce: true,
            chunks: 'all'
          }
        }
      },
      minimizer: !is_prod ? [] : [
        new UglifyJsPlugin({
          parallel: true,
          sourceMap: !is_prod
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        IS_PRODUCTION: JSON.stringify(is_prod),
        VERSION      : JSON.stringify(package_json.version),
        NAME         : JSON.stringify(package_json.description)
      }),
      new HtmlWebpackPlugin({
        template: 'static/index.html',
        filename: 'index.html',
        hash    : true,
        variables: {
          publicPath: public_path,
        }
      }),
      new CopyWebpackPlugin([
        {
          context: 'static',
          from   : '**/*',
          ignore : 'index.html',
          to     : OUTPUT_PATH
        }
      ]),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
    ],
    watchOptions: {
      poll: true
    },
    devServer: {
      port: 3000,
      host: '0.0.0.0',
      contentBase: 'build'
    }
  };
};

export default webpack_config;
