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

// Get the name of each file in the src/posts directory
const blogNameArray = fs.readdirSync(blogDirectory, async (err, files) => {
	if (err) { return console.log(err) }
	return files
});

// Using the array of names above, we grab the data rom each file and transform it to html using the node-markdown-parser package
const blogData = blogNameArray.map(file =>
	markdown.toJSON(fs.readFileSync(`${blogDirectory}${file}`, 'utf8'))
);

// Using our blog data above, create ejs files from posts
// Then we get a list of all those files and inject this list as a variable at the top of writing.ejs, in order to correctly reference it.
Promise.all(blogData.map(async data => {
	// Create ejs file using markdown data
	const topSection = `
<main>
<% include ../components/header %>
<section class="section--blog">
`

	const bottomSection = `
</section>
</main>
<% include ../components/footer %>
`
	// content to write is the header, data body, and footer
	const content = `${topSection} ${data.body} ${bottomSection}`

	// name is the id of the first item of the toc array
	const name = data.toc[0].id;

	// name of the file
	const file = `${viewsDirectory}${name}.ejs`

	// write the file to the views directory
	try {
		await fs.writeFile(file, content, 'utf8', (err) => {
			if (err) return err;
			console.log(`Wrote data to ${name}\n`);
		})
	} catch (err) {
		return console.log(`Catch block: Cannot write to file ${name}: `, err);
	} finally {
		return file;
	}
})).then(async blogFiles => {
	const startStr = `<% var blogData = [`
	const endStr = `] %>`;
	const data = blogFiles.map(file => `"${file.split('.')[1].split('/')[3]}.html"`);
	const dataToAdd = startStr + data + endStr;

	// add blogFiles as data at in writing.ejs
	const blogIndexFile = './src/views/writing.ejs';
	let blogIndexData = fs.readFileSync(blogIndexFile, 'utf8').split('\n');
	let blogdataVariable = blogIndexData.shift();

	// Compare if the variables aka the blog posts list has changed. if it has, rewrite writing.ejs
	if (blogdataVariable !== dataToAdd) {
		let newBlogIndexData = [dataToAdd, ...blogIndexData];
		let newData = newBlogIndexData.join('\n')

		try {
			return await fs.writeFileSync(blogIndexFile, newData, 'utf8', (err, data) => {
				if (err) return console.log(err);
				console.log(`\nWrote ${data} to writing.ejs\n`);
			});
		} catch (err) {
			return console.log('Error attempting to write blogData.ejs', err);
		}
	}
});

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
		let name = path.split('.')[1].split('/')[3];
		if (name === 'posts') name = 'posts1';
		entries[name] = path;
		return entries;
	}, {}
);

let blogCount = 0;

const htmlPlugins = glob.sync(`${viewsDirectory}*.ejs`).reduce(
	(htmlPluginInstances, path) => {
		const name = path.split('.')[1].split('/')[3];
		let title;
		let description;
		let keywords = "web, developer, javascript, HTML, CSS, react, remote, front-end, full-stack, back-end, web developer, react developer, redux, weird web"
		let isBlogPost = false;
		let posts = [];

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

				posts = ['test1', 'test2'];
				break;
			default:
				let post = blogData.filter(data => data.toc[0].id === name)[0];

				// post was deleted
				if (post === undefined) {
					let file = `${viewsDirectory}${name}.ejs`;
					fs.unlinkSync(file, (err) => {
						if (err) {
							console.log(err);
							throw err;
						}

						console.log(`Deleted ${file}.`)
					});

					return htmlPluginInstances;
				}

				// post is missing the properties below
				if (post.title === undefined) post.title = '';
				if (post.description === undefined) post.description = '';
				if (post.keywords === undefined) post.keywords = '';

				title = post.title;
				description = post.description;
				keywords = post.keywords;
				isBlogPost = true;
				blogCount++;
				break;
		}

		const chunkName = isBlogPost ? `posts${blogCount}` : name;
		const themeColor = '#FE53BB';
		const httpEquiv = {
			'http-equiv': 'Content-Security-Policy',
			'content': `default-src 'self' ${name === 'index' ? 'connect-src  https://catfact.ninja/' : ''}`
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
			chunks: [`${chunkName}`],
			meta: {
				description,
				keywords,
				'Content-Security-Policy': httpEquiv,
				'theme-color': themeColor
			},
			posts
		});

		return [...htmlPluginInstances, newInstance]
	}, []
);

/*
	Because I could not get webpack's splitChunk optimization to work correctly
	I ended up just getting the number of blog posts and creating a bundle for each one, each referencing the same posts.js

	This is not ideal, especially as the app grows in size. When that happens, I'll probably migrate to eleventy or Next.js anyway.

	For now, it will work.
*/

const blogEntries = {};
blogNameArray.forEach((name, idx) => {
	blogEntries[`posts${idx + 1}`] = `${pagesDirectory}posts.js`
});

module.exports = {
	entry: { ...entries, ...blogEntries }, // Combine the normal pages with the blog pages, which would normally not be necessary
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins:
		htmlPlugins
			.concat([
				new MiniCssExtractPlugin(),
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
					'postcss-loader',
					'sass-loader'
				]
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