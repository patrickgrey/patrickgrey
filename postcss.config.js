require("dotenv").config();
const source = process.env.COURSE_INPUT_FOLDER || "course-source";
const publish = process.env.COURSE_PRODUCTION_FOLDER || "course-publish";

module.exports = ({ env }) => ({
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    tailwindcss: {},
    autoprefixer: {},
    cssnano:
      env === "production"
        ? {
          preset: ["default", { discardComments: { removeAll: true } }],
        }
        : false,
  },
});
