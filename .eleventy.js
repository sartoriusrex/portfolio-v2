module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "ejs",
    "11ty.js",
    "css",
    "svg",
    "png",
    "webp",
    "jpeg",
    "pdf",
    "jpg"
  ]);

   eleventyConfig.addPassthroughCopy({ "**/*.svg": "images" });
   eleventyConfig.addPassthroughCopy({ "**/*.png": "images" });
   eleventyConfig.addPassthroughCopy({ "**/*.jpg": "images" });
   eleventyConfig.addPassthroughCopy({ "**/*.jpeg": "images" });
   eleventyConfig.addPassthroughCopy({ "**/*.webp": "images" });
   eleventyConfig.addPassthroughCopy({ "**/*.pdf": "images" });
};