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
		const name = path.split('.')[1].split('/')[3];
		entries[name] = path;
		return entries;
	}, {}
);

const htmlPlugins = glob.sync(`${viewsDirectory}*.ejs`).reduce(
	(htmlPluginInstances, path) => {
		let title;
		let description;
		let keywords = "web, developer, javascript, HTML, CSS, react, remote, front-end, full-stack, back-end, web developer, react developer, redux, weird web"
		const name = path.split('.')[1].split('/')[3];
		console.log(name);

		switch (name) {
			case "index":
				title = "Dennis Mai // Making it interesting since 1988!";
				description = "Dennis Mai, trying to make the web weirder, more original, more niche, more 90s. This is his personal and authentic web garden.";
				break;
			case "contact":
				title = "Dennis Mai // Contact me!";
				description = "The easiest way to contact Dennis Mai, even if you're sitting next to him.";
				break;
			case "about":
				title = "Dennis Mai // Wait, who?";
				description = "A short, probably true description of who and why Dennis Mai is. Who really knows, though?";
				break;
			case "projects":
				title = "Dennis Mai // Some Things Dennis Mai has worked on";
				description = "Some of the projects Dennis Mai has or is working on; A lot of them are kind of embarassing, but that's okay.";
				break;
			case "writing":
				title = "Dennis Mai // Some Things Dennis Mai has written";
				description = "The written word of Dennis Mai. Some would say it's worth less than its weight in iceberg lettuce, or even celery. They're just jealous.";
				break;
			default:
				title = fs.readFile(path, 'utf8', function (err, data) {
					if (err) {
						return console.log(err);
					}

					console.log(data);
					return data;
				});
				description = "This is a blog post.";
				keywords = "example keywords";
		}

		const themeColor = '';
		const httpEquiv = {
			'http-equiv': 'Content-Security-Policy',
			'content': 'default-src self'
		}

		let newInstance = new HtmlWebpackPlugin({
			title,
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			},
			template: path,
			inject: true,
			filename: `${name}.html`,
			chunks: [`${name}`],
			meta: {
				description,
				keywords,
				'Content-Security-Policy': httpEquiv,
				'theme-color': themeColor
			}
		});

		return [...htmlPluginInstances, newInstance]
	}, []
);

module.exports = {
	entry: entries,
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins:
		htmlPlugins.concat([
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
		]),
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