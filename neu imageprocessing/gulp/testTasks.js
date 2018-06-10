'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const jasmine = require('gulp-jasmine');
const {SpecReporter} = require('jasmine-spec-reporter');
const runSequence = require('run-sequence');

gulp.task('eslint', () => {
  return gulp.src([
    './**/*.js',
    '!./node_modules/**/*.js',
    '!./out/**/*.js',
    '!./target/**/*.js'
  ]).pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('istanbul', () => {
  return gulp.src('./src/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test:server', ['istanbul'], () => {
  return gulp.src('./test/**/*.test.js')
    .pipe(jasmine({
      reporter: new SpecReporter({
        summary: {
          displayStacktrace: true
        }
      })
    }))
    .pipe(istanbul.writeReports({
      dir: './target/coverage/server',
      reporters: ['lcov']
    }));
});

gulp.task('test', (done) => {
  runSequence('eslint', 'test:server', done);
});
