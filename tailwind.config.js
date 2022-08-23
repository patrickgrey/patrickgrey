require("dotenv").config();

const source = process.env.COURSE_INPUT_FOLDER || "course";

module.exports = {
  content: [`./${source}/**/*.html`, "index.njk"],
  theme: {
    screens: {
      md: "720px",
      lg: "1024px",
      // => @media (min-width: 720px) { ... }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
