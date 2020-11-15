---
keywords: ejs, webpack, blog, markdown, simple blog, Vanilla JS, GSAP, Lean Web, JAM Stack
title: Dennis Mai - How I Made My Blog
description: How I made my blog using just ejs, webpack, scss, and vanilla JS. (And GSAP for animations. It's unnecessary -- but fun)
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

Webpack 5 just came out, and its release is a hot debate, because, well, it's like they didn't even try to see what would and wouldn't break. I know and love (and kind of hate) Webpack 4, so I'm stickin' with the old guns for now.

### SASS (scss)

I love it. It's actually mostly unnecessary with the power of the current CSS3 api, but, again, I know it well and I enjoy it.

### Vanilla Javascript

This was a no-brainer. At the time of this writing, I'm only familiar with React. I'm no expert, but I'm certainly no novice at this point. I would love to learn Vue, Svelte, Preact, and even Angular, but I also want this site to be as fast as possible and rely on as few dependencies as possible. And that's not a realistic expection when using those Javascript libraries or frameworks. Vanilla Javascript is good. It's performant, and you really don't need more.

### GSAP

Okay, GSAP is my 20%. I had never worked with GSAP before and had only heard good things. So I'm giving it a shot, and so far, it's wonderful. Very fun, very intuitive, and VERY powerful. Highly recommended.

### Project Setup

I have all the code in the root/src folder with configs for postcss and webpack under the root directory. I use separate webpack configs for dev and production and use webpack-merge to merge them with common configurations.

I am also hosting on Netlify, which is its own topic.

In my src folder, I have directories for images, fonts, components, posts, scripts, styles, and views.

You can really have it any way you like, such as having styles next to their pages (or their views or their components. It doesn't matter).

The key is that my Webpack entry points are pointing the pages directory. Each file there is its own entrypoint, except for blog posts, which I'll get to later.

