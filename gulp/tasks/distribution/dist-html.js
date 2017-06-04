var gulp    = require('gulp');
var htmlmin = require('gulp-htmlmin');


gulp.task('html-minify', function() {
  return gulp.src('./_dist/_site/**/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./_dist/_site/'));
});
