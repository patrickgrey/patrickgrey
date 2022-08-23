require("dotenv").config();
const path = require("path");
const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const CleanCSS = require("clean-css");

const source = process.env.COURSE_INPUT_FOLDER || "course-source";
const publish = process.env.COURSE_PRODUCTION_FOLDER || "course-publish";

function coreStyles() {
  let code = fs.readFileSync(
    `./${publish}/_shared/_styleguide/pg-styleguide.css`,
    "utf8"
  );
  code += fs.readFileSync(`./${publish}/_shared/_shared.css`, "utf8");
  const minified = new CleanCSS({}).minify(code).styles;
  return minified;
}

async function imageShortcode(src, alt, cls, sizes, widths, formats) {
  const imagePath = path.dirname(src);
  const urlPath = imagePath + "/";
  const outputDir = "./" + publish + this.page.url + imagePath + "/";
  const imageSource = "./" + source + this.page.url + src;
  const sizesString = sizes || `(max-width: 2400px) 100vw, 2400px`;

  let metadata = await Image(imageSource, {
    widths: widths || [320, 640, 960, 1200, 1800, 2400],
    formats: formats || ["avif", "webp", "jpeg"],
    urlPath: urlPath,
    outputDir: outputDir,
  });

  let imageAttributes = {
    class: cls || "",
    alt,
    sizes: sizesString,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy(`${source}/index.css`);
  // Shortcodes take care of copying images.
  // What about images for animations???? Shortcode for animations which deal with this?
  // Solution: keep copying images and it is up to developers to optimise for the largest size image.

  eleventyConfig.addPassthroughCopy(`${source}/**/*.jpg`);
  eleventyConfig.addPassthroughCopy(`${source}/**/*.jpeg`);
  eleventyConfig.addPassthroughCopy(`${source}/**/*.png`);
  eleventyConfig.addPassthroughCopy(`${source}/**/*.svg`);
  eleventyConfig.addPassthroughCopy(`${source}/**/*.webp`);
  eleventyConfig.addPassthroughCopy(`${source}/**/*.avif`);
  eleventyConfig.addPassthroughCopy(`${source}/**/*.mp3`);
  eleventyConfig.addPassthroughCopy(`${source}/**/*.pdf`);

  // eleventyConfig.addWatchTarget(`./${source}/index.css`);
  // eleventyConfig.addWatchTarget(`./${source}/**/*.css`);
  // eleventyConfig.addWatchTarget(`./${source}/**/*.js`);

  eleventyConfig.setWatchJavaScriptDependencies(false);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    files: [`${publish}/**/*.css`, `${publish}/**/*.js`],
    ui: false,
    reloadOnRestart: true,
    open: false,
    ghostMode: false,
  });

  // SHORTCODES

  // {% svgIcon 'url-to-svg.svg' %}
  eleventyConfig.addNunjucksAsyncShortcode('svgIcon', async (src, alt, sizes) => {
    let metadata = await Image(src, {
      formats: ['svg'],
      dryRun: true,
    })
    return metadata.svg[0].buffer.toString()
  });


  eleventyConfig.addNunjucksShortcode("test", function (returnString) {
    const imagePath = path.dirname(returnString);
    return "." + this.page.url + imagePath + "/";
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksShortcode("coreStyles", coreStyles);

  eleventyConfig.addNunjucksShortcode("video", function (id) {
    return `<div class="ians-video-16-9">
		<iframe
			src="https://www.youtube.com/embed/${id}?rel=0&showinfo=0"
			loading="lazy"
			frameborder="0"
			allowfullscreen
			title="Youtube video"
		></iframe>
	</div>`;
  });

  eleventyConfig.addNunjucksShortcode("vimeo", function (id) {
    return `<div class="ians-video-16-9">
		<iframe
			src="https://player.vimeo.com/video/${id}"
			loading="lazy"
			width="640"
						height="564"
						frameborder="0"
						allow="autoplay; fullscreen"
						allowfullscreen
		></iframe>
	</div>`;
  });

  eleventyConfig.addNunjucksShortcode("lmsBanner", function () {
    let html = ``;
    if (process.env.NODE_ENV === "development") {
      html = `<div class="ians-lms-banner">
		<a href="/index.html">&lt;&lt; Back</a>
	</div>`;
    }
    return html;
  });

  return {
    templateFormats: ["njk", "html"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: source,
      output: publish,
      data: "../_utilities/_data",
      includes: "../_utilities/_includes",
    },
  };
};
