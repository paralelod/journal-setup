var gulp   = require('gulp');
var config = require('../../config').watch;


/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch', ['browsersync'], function() {
  gulp.watch(config.jekyll,['jekyll-rebuild']);
  gulp.watch(config.yml,['yamlDev']);
  gulp.watch(config.imgs,['imgs']);
  gulp.watch(config.assets,['webpack']);
  gulp.watch(config.theme,['theme-rebuild']);
});
