module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "ejs",
    "11ty.js",
    "css",
  ]);

  eleventyConfig.addPassthroughCopy('src/_includes/images', 'images');
  eleventyConfig.addPassthroughCopy('src/scripts');
};