'use strict';

/**
 * Default test configuration.
 */
const WebpackBaseConfig = require('./Base');
const webpack = require('webpack');

class WebpackTestConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      devtool: 'inline-source-map',
      externals: {
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        'react/lib/ReactContext': true,
      },
      module: {
        preLoaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'isparta-loader',
            include: [
              this.srcPathAbsolute
            ]
          }
        ],
        loaders: [
          {
            test: /\.scss$/,
            loader: 'style!css!sass'
          },
          { 
            test: /\.(png|jpg)$/,
            include: path.join(__dirname, 'img'),
            loader: 'url-loader?limit=10000' 
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            query: {
              presets: ['airbnb']
            },
            include: [].concat(
              this.includedPackages,
              [
                this.srcPathAbsolute,
                this.testPathAbsolute
              ]
            )
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"test"'
        })
      ]
    };
  }

  /**
   * Set the config data.
   * Will remove the devServer config value as we do not need it in test environments
   * This function will always return a new config
   * @param {Object} data Keys to assign
   * @return {Object}
   */
  set config(data) {

    const baseSettings = this.defaultSettings;
    delete baseSettings.devServer;
    this._config = Object.assign({}, baseSettings, data);
    return this._config;
  }

  /**
   * Get the global config
   * @param {Object} config Final webpack config
   */
  get config() {
    return super.config;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'test';
  }
}

module.exports = WebpackTestConfig;
