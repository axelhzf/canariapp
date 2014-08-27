var gulp = require("gulp");
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("less", function () {
  gulp.src("app/client/style/main.less")
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest("app/assets/style"));
});

gulp.task("default", ["less"]);