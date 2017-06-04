var gulp = require('gulp');
var runSequence = require('run-sequence');
var imageOp = require('gulp-image-optimization');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var config = require('../../config').images;
var manifest = require('../../config').manifest;
var assetManifest = require('gulp-asset-manifest');

gulp.task('imgs', function() {
  runSequence(
              'imgs-clean',
              'sketch',
              'copy-design-links',
              'imgs-copy',
              'imgs-resp'
        );
});

gulp.task('imgs-clean', function () {
  return gulp.src([
    config.imgSrc,
    config.imgDest], 
    {read: true})
    .pipe(clean());
});

gulp.task('imgs-copy', function() {
  return gulp.src([
      config.imgSrc+'*.*',
      config.imgSrcResp+'*.*'
    ])
    .pipe(gulp.dest(config.imgDest))
    .pipe(assetManifest({
      bundleName: 'images',
      manifestFile: manifest.imagesDest,
      includeRelativePath:true, 
      log:true
    }));
});

gulp.task("imgs-resp", function () {

 var imgSrcPaths ={
    src: config.imgSrcResp+'*.*',
    dest: config.imgDest
  };

  function GenImages(value){
    gulp.src(imgSrcPaths.src)
    .pipe(imageResize({ 
        width : value,
        quality: 1 
      }))
    .pipe(rename(function (path) { 
      //path.basename += '_'+value+'px';
      path.dirname += "/"+ value;
    }))
    .pipe(imageOp({
          optimizationLevel: 10,
          progressive: true,
          interlaced: true
    }))
    .pipe(gulp.dest(imgSrcPaths.dest));
  }

  for ( var i = 0; i < config.imgBreakpoints.sizes.length; i++) {
    var objs = config.imgBreakpoints.sizes[i];
    console.log(imgSrcPaths.src+ '------' + objs);
    GenImages(objs);
    }
});



