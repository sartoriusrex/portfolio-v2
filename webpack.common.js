const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Critters = require('critters-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: './src/app.js',
		test: './src/test.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Dennis Mai Personal Website",
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			},
			template: "!!ejs-webpack-loader!src/pages/index.ejs",
			filename: "index.html",
			chunks: ['app']
		}),
		new HtmlWebpackPlugin({
			title: "test",
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			},
			template: "!!ejs-webpack-loader!src/views/test.ejs",
			filename: "test.html",
			chunks: ['test']
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
		new Critters({
			fonts: true,
			preload: "js-lazy",
			noscriptFallback: true
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|pdf|ico)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "imgs"
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	node: {
		fs: "empty",
		tls: 'empty',
		dns: 'empty',
		net: 'empty'
	}
};