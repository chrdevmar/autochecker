const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    notificationListener: './src/notificationListener.js',
    popup: './src/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
