var gulp = require('gulp');
var clean   = require('gulp-clean');
var yamlMerge = require('gulp-yaml-merge');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var config = require('../../config').yaml;
var manifest = require('../../config').manifest;
var assetManifest = require('gulp-asset-manifest');


// ######### yaml ###############

gulp.task('yamlDev', function() {
  runSequence('yaml-clean',
              'yaml-buildDev' 
    );
});


// ######### yaml clean ###############

gulp.task('yaml-clean', function () {
  return gulp.src(config.yamlClean, {read: true})
    .pipe(clean());
});



// ######### yaml build ###############


gulp.task('yaml-buildDev', function() {
  return gulp.src(config.yamlDevSrc)
    .pipe(yamlMerge(config.yamlBuild))
    .pipe(gulp.dest(config.pathBuild));
});

