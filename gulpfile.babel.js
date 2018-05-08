import gulp from "gulp";
import {spawn} from "child_process";
import hugoBin from "hugo-bin";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import watch from "gulp-watch";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
//
import cp from "child_process";
import replace from "gulp-replace";
import del from "del";
import colors from "colors";

const browserSync = BrowserSync.create();

// Hugo arguments
const hugoArgsDefault = ["-d", "../dist", "-s", "site", "-v"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture"];

// Development tasks
gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, hugoArgsPreview));

// Build/production tasks
gulp.task("build", ["css", "js", "cms"], (cb) => buildSite(cb, [], "production"));
gulp.task("build-preview", ["css", "js"], (cb) => buildSite(cb, hugoArgsPreview, "production"));

// Compile CMS
gulp.task("cms", () => {
  const match = process.env.REPOSITORY_URL ? process.env.REPOSITORY_URL : cp.execSync("git remote -v", {encoding: "utf-8"});
  let repo = null;
  match.replace(/github.com[:/](\S+)(\.git)?/, (_, m) => {
    repo = m.replace(/\.git$/, "");
  });
  gulp.src("./src/cms/*")
    .pipe(replace("<% GITHUB_REPOSITORY %>", repo))
    .pipe(gulp.dest("./dist/admin"))
    .pipe(browserSync.stream());
  gulp.src(["./node_modules/netlify-cms/dist/*.*", "!./node_modules/netlify-cms/dist/*.html"])
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream())
});

// Compile CSS with PostCSS
gulp.task("css", () => (
  gulp.src("./src/css/*.css")
    .pipe(postcss([cssImport({from: "./src/css/app.css"}), cssnext()]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));

// Compile Javascript
gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

// Development server with browsersync
gulp.task("server", ["hugo", "css", "js", "cms"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  watch("./src/js/**/*.js", () => { gulp.start(["js"]) });
	watch("./src/cms/*", () => { gulp.start(["cms"]) });
  watch("./src/css/**/*.css", () => { gulp.start(["css"]) });
  watch("./site/**/*", () => { gulp.start(["hugo"]) });
});

// Remove unwanted directories
function removeDirectories() {
  console.log('Removing Directories'.inverse);
  return del([
    './dist/authors/',
    './dist/authors/**/*',
    './dist/clients/',
    './dist/clients/**/*'
  ]);
}

// Landing Pages
function setupLandingPages() {
	console.log('Moving landing pages to root'.inverse);
  // '!./dist/landing/index.html' -> do not copy the hugo generated landing
  // list page, otherwise it overwites ./index.html
  gulp.src(['./dist/landing/**/*', '!./dist/landing/index.html'])
    .pipe(gulp.dest('./dist'));
  // Delete leftover '/landing' directory
  return del(['./dist/landing/']);
}

/**
 * Run hugo and build the site
 */
function buildSite(cb, options, environment = "development") {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;

  process.env.NODE_ENV = environment;

  return spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      removeDirectories();
			setupLandingPages();
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
