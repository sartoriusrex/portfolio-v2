const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Critters = require('critters-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const glob = require('glob');
const pagesDirectory = './src/pages/';
const viewsDirectory = './src/views/';

const entries = glob.sync(`${pagesDirectory}*.js`).reduce(
	(entries, path) => {
		const name = path.slice(pagesDirectory.length, path.length - 3);
		entries[name] = path;
		return entries;
	}, {}
);

const plugins = glob.sync(`${viewsDirectory}*.ejs`).reduce(
	(htmlPluginInstances, path) => {
		let title;
		const name = path.slice(viewsDirectory.length, path.length - 3);

		switch (name) {
			case "index":
				title = "Dennis Mai // Personal Website!";
			case "contact":
				title = "Contact Dennis Mai";
			case "about":
				title = "Wait, who's Dennis Mai?";
			case "projects":
				title = "Some Things Dennis Mai has worked on";
			case "writing":
				title = "Some Things Dennis Mai has written";
			default:
				title = fs.readFile(path, 'utf8', function (err, data) {
					if (err) {
						return console.log(err);
					}

					console.log(data);
					return data;
				});
		}
		return new HtmlWebpackPlugin({
			title,
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			},
			template: path,
			inject: true,
			filename: `${name}.html`,
			chunks: [name]
		})
	}, []
);

console.log(plugins);

module.exports = {
	entry: entries,
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [],
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
			title: "Contact",
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