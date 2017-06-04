var fs = require('fs');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var ghPages= require("gulp-gh-pages");
var GulpSSH = require('gulp-ssh');
var sftp = require('gulp-sftp');
var config = require('../../config').deploy;

// var sshInfo = {
//   host: '192.168.0.21',
//   port: 22,
//   username: 'node',
//   privateKey: fs.readFileSync('/Users/zensh/.ssh/id_rsa')
// };

// var gulpSSH = new GulpSSH({
//   ignoreErrors: false,
//   sshConfig: sshInfo
// });

// gulp.task('sshExec', function () {
//   return gulpSSH
//     .exec(['uptime', 'ls -a', 'pwd'], {filePath: 'commands.log'})
//     .pipe(gulp.dest('logs'))
// })


gulp.task("docker-volume-deploy", function () {
    return gulp.src(config.dockerVolume.src)
        .pipe(ghPages({branch: config.dockerVolume.branch}));
});

gulp.task('docker-volume-build', function() {
  return gulp.src(config.dockerVolume.files)
 .pipe(gulp.dest(config.dockerVolume.dest));
});

gulp.task('ghpages-build', function() {
  runSequence(
    'yamlDistGhPages',
    'data-jekyll',
    'dist-webpack',
    'dist-jekyll-copy',
    'dist-jekyll-build',
    'yamlDev'
    );
});

gulp.task("ghpages-deploy", function () {
    return gulp.src(config.ghPages.src)
        .pipe(ghPages({branch: config.ghPages.branch}));
});


gulp.task('html-build', function() {
  runSequence(
    'yamlDistHtml',
    'data-jekyll',
    'dist-webpack',
    'dist-html-copy',
    'dist-html-build',
    'dist-html-clean',
    'yamlDev',
    'html-minify'
    );
});

gulp.task("html-deploy", function () {
    return gulp.src(config.html.src)
        .pipe(ghPages({branch: config.html.branch}));
});