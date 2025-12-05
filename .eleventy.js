const path = require("path");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "100vw") {
  let metadata = await Image(src, {
    widths: [600, 1200, 1800],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/img/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  // Pass through specific asset files (excluding videos and mp4s)
  eleventyConfig.addPassthroughCopy("src/assets/*.gif");
  eleventyConfig.addPassthroughCopy("src/assets/*.png");
  eleventyConfig.addPassthroughCopy("src/assets/*.jpg");
  eleventyConfig.addPassthroughCopy("src/assets/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/assets/*.svg");
  
  // Copy favicon to root
  eleventyConfig.addPassthroughCopy({"src/assets/favicon.png": "favicon.png"});
  
  // Copy GitHub Pages configuration files
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  
  // Add absoluteUrl filter for social sharing
  eleventyConfig.addFilter("absoluteUrl", function(url, base) {
    try {
      return new URL(url, base).toString();
    } catch(e) {
      return url;
    }
  });
  
  // Add image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
  
  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
