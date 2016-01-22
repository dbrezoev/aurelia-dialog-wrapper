var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

gulp.task('build-html-es6', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-es6', ['build-html-es6'], function () {
  return gulp.src(paths.source)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-html-commonjs', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-commonjs', ['build-html-commonjs'], function () {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'common'})))
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-html-amd', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-amd', ['build-html-amd'], function () {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'amd'})))
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-html-system', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-system', ['build-html-system'], function () {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('copy-css-es6', function() {
  return gulp.src(paths.aureliaDialogCss)
    .pipe(gulp.dest(paths.output + 'es6/aurelia-dialog-wrapper'));
});

gulp.task('copy-css-commonjs', function() {
  return gulp.src(paths.aureliaDialogCss)
    .pipe(gulp.dest(paths.output + 'commonjs/aurelia-dialog-wrapper'));
});

gulp.task('copy-css-amd', function() {
  return gulp.src(paths.aureliaDialogCss)
    .pipe(gulp.dest(paths.output + 'amd/aurelia-dialog-wrapper'));
});

gulp.task('copy-css-system', function() {
  return gulp.src(paths.aureliaDialogCss)
    .pipe(gulp.dest(paths.output + 'system/aurelia-dialog-wrapper'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-es6', 'build-commonjs', 'build-amd', 'build-system'],
    'copy-css-commonjs',
    'copy-css-amd'
    'copy-css-es6'
    'copy-css-system'
    callback
  );
});
