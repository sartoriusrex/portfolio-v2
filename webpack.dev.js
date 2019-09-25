const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge( common, {
	mode: 'development',
	devtool: 'cheap-eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		compress: true
	}
});