const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Critters = require('critters-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const glob = require('glob');
const { Markdown } = require("@cenguidanos/node-markdown-parser");

const pagesDirectory = './src/pages/';
const viewsDirectory = './src/views/';
const blogDirectory = './src/posts/';

const markdown = new Markdown();

const blogNameArray = fs.readdirSync(blogDirectory, async (err, files) => {
	if (err) { return console.log(err) }
	return files
});

const blogData = blogNameArray.map(file =>
	markdown.toJSON(fs.readFileSync(`${blogDirectory}${file}`, 'utf8'))
);

//Create ejs files from posts, which are markdown files;
Promise.all(blogData.map(async data => {
	// Create ejs file using markdown data
	const topSection =
		`
<main>
<% include ../components/header %>
<section class="section--blog">
`

	const bottomSection =
		`
</section>
</main>

<% include ../components/footer %>
`

	const content = `${topSection} ${data.body} ${bottomSection}`

	const name = data.toc[0].id;

	// write the file to the views directory
	try {
		return await fs.writeFile(`${viewsDirectory}${name}.ejs`, content, 'utf8', (err) => {
			if (err) return err;
			return console.log(`Wrote data to ${name}`)
		})
	} catch (err) {
		return console.log(`Catch block: Cannot write to file ${name}: `, err);
	}
}));

/*
blogdata.forEach(file => console.log(file));

{
	keywords: 'Dennis Mai, Blog, Development, Weird Wide Web',
	extension: '.md',
	updatedAt: 1605249017156,
	toc: [
	  {
		id: 'introduction-to-this-blog',
		depth: 1,
		text: 'Introduction to this Blog'
	  }
	],
	body: '<h1 id="introduction-to-this-blog">Introduction to this Blog</h1>\n' +
	  "<p>Hello! My name is Dennis Mai. I'm a husband, father, developer, tinkerer, creative, and jiu-jiteiro. In that order. I'm a lot of other things, too, and you'll figure a lot of that out if you read more. But that's sufficient to start.</p>\n" +
	  '<p>I write about technology, culture, society, Brazilian Jiu Jitsu, Fatherhood, being a husband (husband...hood?), and other things, too.</p>\n' +
	  "<p>I've made this blog--and my personal website--as unique to me as possible. Some times that means the site won't load quickly. Some times that means it's not 100% accessible. And some times it means it will just weird you out a little bit. Or a lot. Anyway, it's a work in progress. I try to make sure everybody can digest my content, but, you know what? I won't be able to make everyone happy. And that's okay. That's life. I'm sorry if I offend any of you (truly, I am).</p>\n" +
	  '<p>That said, you can always send me feedback via email.</p>\n' +
	  "<p>Enjoy the tour, and and I hope you'll be inspiried to make the web a little bit better. And a little bit weirder.</p>"
  }
*/

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
				let post = blogData.filter(data => data.toc[0].id === name)[0];
				title = post.title;
				description = post.description;
				keywords = post.keywords;
		}

		const themeColor = '#FE53BB';
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
		htmlPlugins
			.concat([
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