# Portfolio version 3.0

Made using ejs, webpack, sass and minimal javascript. Deployed via netlify, which also handles form submissions. Simple and fast. Most of the work was in the configuration with Webpack.

## Table of Contents

- [Project Structure](#project-structure)
- [Creating Blog Posts](#creating-blog-posts)
- [My Webpack Explained](#my-webpack-explained)
- [Project Todos](#project-todos)
- [Change Log](#change-log)

## Project structure

A lot of details can be found in the blog post I made about this blog [here](https://www.dennismai.dev/how-i-made-this-blog). However, this readme will provide more details on the project structure and how to get it working.

### Folders

#### Root

At the project root, we have following configuration files
1. Webpack, broken down by dev, production, and common files, bundles the code of our app together and optimizes it for the environment it will be shown in, dev or production. .
2. netlify.toml for deploying to Netlify. This one is bare-bones. The 404 page is already available, and netlify can find it to display when necessary (dist folder)
3. pa11y for testing accessibility. This is being worked on now and will work in the dev environment after starting the dev server. Current errors include duplicate ids from svgs generated by inkscape. This task is marked in [Todos](#project-todos)
4. postcss to process and optimize our scss and css, used in webpack
5. the db.json which stores the data about our blog posts. Webpack runs a function to parse all the files in the src/posts directory to write the db.json file, which is then used in the posts index page of the site. When a post is updated, the updated date...updates.
6 Dist folder for production files. All images, static html pages, css files, and javscript scripts are found here, optimized.
7. node_modules, of course
8. license file
9. Package.json file which only has a few scripts to start the dev server, watch for files, build production, and run accessiblity tests. It's also barebones.
10 And last but not least, the source of our creativity: the src folder (pun intended)
11. Hidden are obviously various files for .env and .git. Current the .env has a sendgrid account, but it's not active (and not pushed, obviously)

#### src

Src contains the following directories:

1. components - code templates that are either reused or make the code easier to read
2. content.md - this is not published. It is a draft of the content of the website. I could delete it now, but it's a good place to add new content as well before being able to implement it
3. fonts - obviously contains all the fonts I'm using
4. images - within this directory you will also find images used under the projects, posts, as placeholders, and icons. **All** images must be imported in a javscript file to be used and bundled by webpack. The file that does this import is /src/scripts/images.js. Currently in the process of implementing lazy-loading as well, although currently it's not as necessary. I have few images that are being loaded off screen. It is always good practice, though.
5. pages - these are the entrypoints that webpack uses to construct the static html files bundled with their css and javascript files. For pages that use a template, like the blog posts, the files are used multiple times. These files basically import other files and functions, nothing more. Their names MUST match the corresponding file in the views directory in order to be properly bundled by webpack.
6. posts - this contains ONLY the content, written in markdown (.md) and SOME html (figcaptions, for example). If a post changes (updates) or is removed, a function in webpack will subsequently update the db.json file with the new content and a new updated date, or remove it if it's no longer there.
7. scripts - javascript code, basically. In this case, it's mostly DOM manipulation with GSAP thrown in there, as well as some data, such as the skillslist, which is what it sounds like. Images.js imports all the images. Currently blogList isn't used and neither audio, although there are plans to use them later. I think.
8. styles - what it sounds like. There is a _variables file that is imported all over, as well as the global styesheet style.scss. These files are imported in their respective pages file
9. views - these are the html templates (in this case, .ejs, although this is easily switched out in webpack for other template languages). All static files needed to be created here, but dynamic files, such as those in the posts directory, are dynamically created by a function in the webpack.common file.

## Creating Blog Posts

It's really as simple as creating a new markdown file in the posts directory. It is **NECESSARY** and good practice to include head content, which looks like the following:

```
---
keywords: Dennis Mai, Blog, Fatherhood
title: Dennis Mai - Being a Present and Mindful Father
description: Being present and mindful as a father -- being your best self so that your child/children can be their best selves
---
```

keywords, title, and description are necessary.

To insert images, you first have to have it in the images/posts directory, and then reference using the link 'imgs/your-image-name.extension'

The image also needs to be imported in the scripts/images.js file.

That's basically it.

## My Webpack Explained

This is going to be a long section. If you prefer to skip it, you can advance to the [todos](#project-todos) or go back up to the [table of contents](#table-of-contents).

You can walk through the code yourself. It is well-commented, but I can provide more context and explanation here.

### The Top

At the top we immediately import our plugins, as well as the node path and fs modules, which we will make heavy use of. We also import glob, a package that can easily read the files in a directory that match a glob pattern. The fs module has limited ability to do this, which is why we are importing it.

We also import Markdown to convert our markdown into HTML. This is straightforward. It also reads the head content to transform into the proper meta tags, as well.

We also define our directories for views, posts, and pages as a constant. Finally we import projects and skills, which are defined in javascript objects in the src/scripts folder; they will be inserted into other files to be used.

### Working with blog posts

First, we have to get the name of all our blog posts with fs.readdirsync. Then we read the db.json file with fs.readFilesync and save it to the variable currentBlogdata.

Then we iterate through the array of blog names, finding the files in the blogDirectory with the corresponding file name, and reading them with fs.readFilesync. In the same function we send that output to Markdown to convert the data to to a JSON object. The final product is an array of JSON Objects.

The JSON objects looks like this:

```
{
	keywords: 'Dennis Mai, Blog, Development, Weird Wide Web',
	title: 'some title.',
	description: 'some description',
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
	  '<p>I write about technology, culture, society, Brazilian Jiu Jitsu, Fatherhood, being a husband (husband...hood?), and other things, too.</p>\n' ETC.>"
}
```

Then we iterate through that array and compare the data to the currentBlogdata that we created earlier. This is a rather heavy and inefficient use of map, since for each JSON object, we also run a Array.filter on the currentBlogData. This basically means the operation is O(n)^2. We could refactor this to O(n), but I'm feeling a bit lazy. Basically, we construct newBlogdata by first checking if current JSON object already exists. If it does not, we return it. If it does, then we also compare the body of the matching current post to the new post. If they are not the same, then we return the new data.

Finally we have an updated array of JSON objects representing our blog posts. We save that to the db.json file, writing over the previous file.

Now comes the fun part. We iterate through all the newBlogData (JSON posts objects) and write a new .ejs file to the views directory.

We create write the top and bottom sections of the ejs file, injecting the meta data found in the JSON object where it belongs, as well as the body where it goes, and contatenate it to the variable 'content'.

We create a name from the title, a file from the name, and write it to the views directory with fs.writeFile.

Finally, we return an object called blogFile that has the file name and the date it was updated.

The next step is to use the array of blogFiles and return another object an object that represents those blog posts online, with a link and the date they were updated. We contatentate that data to a new variable and insert that variable in the writing.ejs file, writing over the previous line.

We write over that by grabbing the writing.ejs file and shifting off the 1st line and replacing it with the variable dataToAdd. This allows our writing.ejs file to read the list of posts we've written and display them and a link to them.

We actually compare the variables to see if they've changed. If they haven't we skip the write step.

### Working with Projects

We do something similar with projects. Luckily, we already have an object with the projects imported from projectList.js. We stringify it and contatenate it to projectsString, inserting that into the projects.ejs page.

We do the same thing on the second line for our skills list, also imported from skillsList.js.

If the data hasn't changed we skip the write step.

### Working with a dynamic list of entry points

To pass a dynamic list of entrypoints to webpack, we use the glob package with the pagesDirectory and return an array of objects with the name attribute set to the path of the entry file.

With each entrypoint, we need an associated HTML file for webpack to bundle together. We create the HTML files by iteratoring through all the files in the views directory and using the HtmlWebpackPlugin on them.

During the iteration, we get the name of th file, and with that name determine the title and description. We already define the keywords. We run a switch statement to check for non-repeated, static pages, such as the index page and the contact page, and if the name doesn't match, then we know it is a blog post page.

If it's a blog post, then we check to see if it still exists in our newBlogdata array (remember, the array of JSON objects representing our blog posts?). If it's not there, that means it's deleted. So we also delete the file using fs.unlink.

Then we check to see if any meta data is missing, and we just set it to an empty string; otherwise we set it using the data already given.

To get unique chunknames, we either use the name, or a generic posts and blog post count contatenated. We set more meta data, such as the content security policy, and then, with all that data, we define a new instance of HtmlWebpackPlugin.

We create an array of blogEntry objects that correspond to each blog post and associate it with the 1 posts.js entry file.

Finally, we contatenate all the entries together, both the normal ones and the blog entries, and set our entry to it.

The webpack file also uses MiniCssExtractPlugin, along with post-css loader and sass-loader, to extract and minify the css from all the files, and then uses Critters to in-line it in the file (for faster render). We also use CleanWebpackPlugin to remove temporary files and directories during this process.

Also, we are using ejs-compiled-loader to convert the ejs to html, although this can EASILY be substituted out for another templating language.

We are loading image files and fonts with file-loader plugin.

And that's pretty much it. Please review the code itself in webpack.common.js.

## Project Todos

- Add more support for pa11y testing
- Use svgo or another image optimizer to automatically automize my images. A lot of them have identical ids, which is not accessible, apparently. Also, it throws off the DOM. Last time I tried to use svgo here, I broke the images somehow. I need to play with this a bit more.
- Add more images to posts
- Add audio with howler or another library! Why not?
- Play around with Marko on a page

## Change log

### 30/03/21

- Update blog posts for How I stay sharp and being a present father.
- Add blog posts about Stoicsim and how I usually learn new technology
- Add support for images in blog posts
- Update readme with more information about this project and how it works
### 20/09/20

- Add support for multiple pages with chunked js and css files via HtmlWebpackPlugin and MiniCssExtractPlugin

### 09/09/20

- Update dependencies and packages after migrating to new work station
- Update Technology and skills section to add Docker
