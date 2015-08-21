var gulp = require("gulp");
var sass = require("sass");

gulp.task("default", function() {

});

gulp.task("sass", function() {
  gulp.src("./public/stylesheets/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/stylesheets"));
});

gulp.task("serve", function() {
  gulp.watch("./public/stylesheets/*.scss", ["sass"]);
});
