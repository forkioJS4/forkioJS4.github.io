const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const gulpSequence = require('gulp-sequence');
const autoprefixer = require('gulp-autoprefixer');

gulp.task("scss", function() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer(['last 15 versions' , '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("srv", ["scss","uglify",'img','fonts','clean'], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("./src/scss/**/*.scss", ["scss"]).on("change", browserSync.reload);
  gulp.watch("./src/img/*.*", ["img"]).on("change", browserSync.reload);
  gulp.watch("./src/js/*.*", ["uglify"]).on("change", browserSync.reload);
  gulp.watch("./index.html").on("change", browserSync.reload);
});

gulp.task("concat", function() {
    return gulp.src('./src/js/*.js')
    .pipe(concat('dist.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean', function () {
  return gulp.src('./dist/', {read: false})
      .pipe(clean());
});

gulp.task("uglify", ['concat'], function () {
    return gulp.src("./dist/js/dist.js")
        .pipe(uglify())
        .pipe(rename('dist.min.js'))
        .pipe(gulp.dest("./dist/js"));
});

gulp.task('img', function() {
  return gulp.src('./src/img/**/*.*')
          .pipe(imagemin({
                  interlaced: true,
                  progressive: true,
                  svgoPlugins: [{removeViewBox: false}],
                  use: [pngquant()]
                })
          )
          .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('dev', gulpSequence('clean', 'srv'));

gulp.task('build', gulpSequence('clean',["scss", "uglify", 'img','fonts']) );

gulp.task("default", ["dev"]);