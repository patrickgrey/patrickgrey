const fs = require("fs");
const path = require("path");
const dirTree = require("directory-tree");
const AdmZip = require("adm-zip");
require("dotenv").config();

const source = process.env.COURSE_PRODUCTION_FOLDER || "course-publish";
const maxMBFileSize = process.env.COURSE_MAXMB_FILESIZE || 2;
const allowFiles = ['.mp3', '.html', '.js', '.css', '.pdf'];

const filteredTree = dirTree(source, {
  extensions: /\.html/,
  exclude: /_data/,
});

const traverse = function (o, fn, scope = []) {
  for (let i in o) {
    fn.apply(this, [i, o[i], scope]);
    if (o[i] !== null && typeof o[i] === "object") {
      traverse(o[i], fn, scope.concat(i));
    }
  }
};

const deleteLargeFiles = function (dirPath) {
  files = fs.readdirSync(dirPath)

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      deleteLargeFiles(dirPath + "/" + file)
    } else {
      const bytes = fs.statSync(dirPath + "/" + file).size;
      const mb = (bytes / (1024 * 1024)).toFixed(2);
      if (mb > maxMBFileSize && !allowFiles.includes(path.extname(file))) {
        console.log("file: ", path.extname(file));
        try {
          console.log("Removed due to being bigger than max file size limit: ", dirPath + "/" + file);
          fs.unlinkSync(dirPath + "/" + file)
        } catch (err) {
          console.error(err)
        }
      }
    }
  })
}

deleteLargeFiles("./" + source);

let pathArray = [];
let previousPath = "";

traverse(filteredTree, (key, value, scope) => {
  if (key === "path") {
    previousPath = value;
  }
  if (key === "extension" && value === ".html") {
    pathArray.push(previousPath);
  }
});

pathArray.splice(pathArray.indexOf(`${source}\\_web-page-template`), 1);
pathArray.splice(pathArray.indexOf(`${source}\\index.html`), 1);

const zipArray = pathArray.map((item) => {
  const splitPath = item.split("\\");
  // Remove index page
  splitPath.pop();
  const path = "./" + splitPath.join("/");

  const zipPath = path + `/${splitPath[splitPath.length - 1]}.zip`;
  const zipFile = new AdmZip();

  zipFile.addLocalFolder(path);
  zipFile.writeZip(zipPath);

  return path;
});
