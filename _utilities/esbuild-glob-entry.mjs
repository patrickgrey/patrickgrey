import { build } from "esbuild";
import glob from "tiny-glob";
import dotenv from 'dotenv';
dotenv.config()

const source = process.env.COURSE_INPUT_FOLDER || "course-source";
const publish = process.env.COURSE_PRODUCTION_FOLDER || "course-publish";
const dev = process.env.NODE_ENV !== "production";

(async () => {
  let entryPoints = await glob(`${source}/**/*.js`);
  await build({
    entryPoints,
    nodePaths: [`${source}/_shared`],
    bundle: true,
    minify: true,
    outdir: publish,
    watch: dev
  });
})();