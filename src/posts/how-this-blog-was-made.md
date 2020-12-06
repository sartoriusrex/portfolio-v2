---
keywords: ejs, webpack, blog, markdown, simple blog, Vanilla JS, GSAP, Lean Web, JAM Stack
title: Dennis Mai - How I Made My Blog
description: How I made my blog using just ejs, webpack, scss, and vanilla JS. (And GSAP for animations. It's unnecessary -- but fun)
tags: Web Dev
---

# How I Made This Blog

First, this is a custom solution that's probably only applicable for small blogs (less than a few hundred posts). Anything more will take a long time to build, for reasons I will explain below.

Second, This blog was built just for fun. While webpack supports building multiple pages with multiple entry points, it was probably never intended for full-blown blog building. There are other tools better suited for the job, like Next.js, Huge, Jekyll, Eleventy, and the like.

That said, if you want to do something similar just for fun, read on!

## The Tech

I tried to make a blog using the SIMPLEST technlogies available, with as few tools as possible while still allowing for website optimizations.

- [EJS](https://ejs.co/) templates to reuse components.
- [Webpack v4](https://webpack.js.org/) for the dev server, building, and optimizations.
- [SASS](https://sass-lang.com/documentation/syntax) for reusing CSS.
- [Vanilla JS](https://vanillajstoolkit.com/), because I don't like dependencies. Webpack is terrible enough.
- [GSAP](https://greensock.com/docs/) For animations. This website is actually my first time using GSAP.

### EJS

Why? Because I'm already very familiar with the syntax. And when building projects that you expect to last a while, it's probably best to use an 80/20 stack mix of tech you know well with new tech you want to learn, which is why...

### I am using Webpack version 4

Webpack 5 just came out, and its release is a hot debate, because, well, it's like they didn't even try to see what would and wouldn't break. I know and love (and kind of hate) Webpack 4, so I'm stickin' with the old guns for now. Also, it's in plain Javascript, so even when I have to learn something new--like making a blog--it's not too much of a stretch figuring things out.

### SASS (scss)

I love it. It's actually mostly unnecessary with the power of the current CSS3 api, but, again, I know it well and I enjoy it.

### Vanilla Javascript

This was a no-brainer. At the time of this writing, I'm only familiar with React. I'm no expert, but I'm certainly no novice at this point. I would love to learn Vue, Svelte, Preact, and even Angular, but I also want this site to be as fast as possible and rely on as few dependencies as possible. And that's not a realistic expection when using those Javascript libraries or frameworks. Vanilla Javascript is good. It's performant, and you really don't need more.

### GSAP

Okay, GSAP is my 20%. I had never worked with GSAP before and had only heard good things. So I'm giving it a shot, and so far, it's wonderful. Very fun, very intuitive, and VERY powerful. Highly recommended.

### Project Setup


```
root    |- configs...
        |- src  |- components
                |- fonts
                |- images
                |- pages
                |- posts
                |- scripts
                |- styles
                |- views
```
I have all the code in the root/src folder with configs for postcss and webpack under the root directory. I use separate webpack configs for dev and production and use webpack-merge to merge them with common configurations.

I am also hosting on Netlify, which is its own topic.

In my src folder, I have directories hosting my assets.

I have styles in its own folder, but you can host them any way you like, including next to their pages (or their views or their components or wherever. It doesn't matter).

Of particular importance are my pages, posts, and views folders.

#### Multi-page sites with Webpack

My Webpack entry points are pointing the pages directory. Each file there there is its own entrypoint, except for blog posts. There is 1 entrypoint for each post (in the posts directory), which all use the same styles and javscript. This is not ideal, but I couldn't get webpack to reuse my entrypoints with the splutChunks options. I might try it again later, but it was extremely frustrating.

#### Transform Markdown to EJS and then to plain HTML

I am using [@cenguidanos/node-markdown-parser](https://github.com/cenguidanos/node-markdown-parser) to return an array of all my posts with their meta content such as title, description and keywords in a json object. To do that, I make use of ```fs.readdirSync``` and ```fs.readFileSync``` to grab the all the posts and their data.

With that data, I construct an ejs template that reuses header and footer components. I then write the template to a corresponding ejs file in the views directory using ```fs.writeFile```.

#### Updating Posts and Preventing Full Rewrites

The tools provided don't provide a simple way of checking if the date being written or read is new or old. In particular the markdown parser will simply create the file with a new updatedAt date, which can be problematic when you didn't update the post.

The way I dealt with this problem is actually be keeping the list of blog data in a simple database file called db.json, to which I compare the new blog data. We construct a new array of the blog data using old, unchanged entries with new and updated entries and write that to the 'database'. This way, the keep the meta data -- especially the updatedAt date -- in tact.

#### Dynamic entry object for Webpack

Before I create any html files, though, I have to create my entry points for Webpack. Using the pages directory, I construct an object with the name of the page file and its path. For posts, I begin with the name 'posts1', since I will need to create 1 entry for each blog post (ugh. Annoying. And VERY non-performant).

#### The HTML files

Now, in order to create all those html files with their css and js files embedded, I get all the ejs files from the views directory and use the [glob](https://www.npmjs.com/package/glob) package to get their paths. It's also possible with the fs module, but glob is easier.

I then use ```Array.reduce()``` to construct a new array of HtmlWebpackPlugin instances of ALL the ejs files, injecting their meta data and associating the appropriate chunk (css and js file) with their names. if they are posts, I have to handle them slightly differently.

Here, I also check if the ejs file is associated with a post that was deleted (no longer in the posts directory). If it's not there, posts is undefined, so I use ```fs.unlink``` to delete it from the views.

In the Webpack Plugins array, I concat the HtmlWebpackPlugins array with MiniCssExtractPlugin, Critters to inline the css, and CleanWebpackPlugin.

The rest is of my webpack config is just configuring scss, ejs, injecting my fonts and images, and setting node rules for different modules.

And there you have it!

#### Caveat

With ejs templates in webpack, the dev server will *not* reload the browser if there are nested ejs templates. That's annoying when we are reusing components defined in .ejs files.

The dev server only checks if the entrypoint files or their indexes (the root ejs pages) have changed, not their nested templates.

## Summary

This was a lot of setup for a small blog. But it's pretty lightweight, and a lot easier to set up than a full-blown blog CRUD app.

That set, it's probably easier to use Huge, Jekyll, or Eleventy. I'll experiment with those later.

