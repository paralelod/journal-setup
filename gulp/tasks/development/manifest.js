var gulp = require('gulp');
var clean   = require('gulp-clean');
var manifest = require('../../config').manifest;
var assetManifest = require('gulp-asset-manifest');
var config = require('../../config').theme;
var manifest = require('../../config').manifest;
 
gulp.task('data-clean', function () {
    return gulp.src([
        manifest.manifestDest
        // manifest.styleDest,manifest.scriptDest,manifest.imagesDest,manifest.jekyllDest
        ])
        .pipe(clean());
});


gulp.task('data-jekyll', function () {
    return gulp.src([config.includes,config.layouts])
    .pipe(assetManifest({
        bundleName: manifest.jekyllBundle,
        manifestFile:manifest.manifestDest,
        // manifestFile: manifest.jekyllDest,
        includeRelativePath:true,
        log:true
    }));
});
