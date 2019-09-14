const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
  entry: {
		app: './src/index.js',
	},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
	},
	devtool: 'cheap-eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		compress: true
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "Dennis Mai Personal Website",
			hash: true,
			minify: true,
			template: "!!ejs-webpack-loader!src/views/index.ejs",
			filename: "index.html",
		})
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	}
};