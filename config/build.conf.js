
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./base.conf')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: {
    'vue-awesome-swiper': './src/index.js'
  },
  externals: {
    // 'swiper/dist/js/swiper.js': {
    //     root: 'Swiper',
    //     commonjs: 'swiper/dist/js/swiper.js',
    //     commonjs2: 'swiper/dist/js/swiper.js',
    //     amd: 'swiper'
    // },
    'swiper': 'swiper/js/swiper.esm.js',
    'object-assign': 'object-assign'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    library: 'VueAwesomeSwiper',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'swiper$': 'swiper/js/swiper.esm.js'
    }
  },
  // optimization: {
  //   minimize: true
  // }
})
