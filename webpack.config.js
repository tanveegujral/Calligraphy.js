var path = require('path'),
	webpack = require('webpack');
module.exports = {
	entry: './src/main.js',
	devtool: false,
	output: {
		path: path.resolve(__dirname, './'),
		filename: 'index.js'
	}
};
