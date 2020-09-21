const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Critters = require('critters-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		app: './src/index.js',
		test: './src/test.js',
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
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Dennis Mai Personal Website",
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			},
			template: "!!ejs-webpack-loader!src/views/index.ejs",
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
			filename: "style.css",
		}),
		new Critters({
			fonts: true,
			preload: "swap",
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
				test: /\.(png|svg|jpg|jpeg|gif|pdf|ico)$/,
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
	},
	node: {
		fs: "empty",
		tls: 'empty',
		dns: 'empty',
		net: 'empty'
	}
};