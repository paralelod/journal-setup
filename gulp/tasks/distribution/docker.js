var fs = require('fs');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var ghPages= require("gulp-gh-pages");
var config = require('../../config').deploy;

gulp.task("docker-volume-deploy", function () {
    return gulp.src(config.dockerVolume.src)
        .pipe(ghPages({branch: config.dockerVolume.branch}));
});

gulp.task('docker-volume-copy', function() {
  return gulp.src(config.dockerVolume.files)
 .pipe(gulp.dest(config.dockerVolume.dest));
});
