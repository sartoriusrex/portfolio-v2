module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "ejs",
    "11ty.js",
  ]);

  eleventyConfig.addPassthroughCopy({ 'src/_includes/images': 'includes/images' });
  eleventyConfig.addPassthroughCopy({ 'src/css': 'includes/css' })
  eleventyConfig.addPassthroughCopy('src/scripts');
};