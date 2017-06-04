var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function() {
    runSequence(
        'dev'
    );
});
gulp.task('dev', function() {
    runSequence(
        'data-clean',
        'webpack',
        'yamlDev',
        'jekyll',
        'data-jekyll',
        'watch'
    );
});