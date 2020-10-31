const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Critters = require('critters-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const pagesDirectory = './src/pages';
const viewsDirectory = './src/views';

console.log(fs.readdir(pagesDirectory, (err, files) => {
	if (err) console.log(err);
	else console.log(files)
}));

module.exports = {
	entry: {
		app: './src/pages/app.js',
		contact: './src/pages/contact.js',
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
			template: "src/views/index.ejs",
			inject: true,
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
			template: "src/views/contact.ejs",
			inject: true,
			filename: "contact.html",
			chunks: ['contact']
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
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									require('autoprefixer')
								]
							}
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.ejs$/,
				use: {
					loader: 'ejs-compiled-loader',
					options: {
						htmlmin: true,
						htmlminOptions: {
							removeComments: true
						}
					}
				}
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