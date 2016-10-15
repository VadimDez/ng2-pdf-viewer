"use strict";

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const Builder  = require("systemjs-builder");
const inlineNg2Template = require('gulp-inline-ng2-template');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
  return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src("src/**/*.ts")
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
  let tsResult = gulp.src([`${ __dirname }/src/**/*.ts`])
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${ __dirname }/build`));
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task('compile-and-inline-html', ['tslint'], () => {
  let tsResult = gulp.src(`${ __dirname }src/**/*.ts`)
    .pipe(inlineNg2Template({ base: './src' }))
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${ __dirname }/build`));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task('resources', () => {
  return gulp.src([`${ __dirname }/src/**/*.css`, `${ __dirname }/src/**/*.html`])
      .pipe(gulp.dest(`${ __dirname }/build`));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
  return gulp.src([
    'es6-shim/es6-shim.min.js',
    'systemjs/dist/system-polyfills.js',
    'systemjs/dist/system.src.js',
    'reflect-metadata/Reflect.js',
    'rxjs/**',
    'zone.js/dist/**',
    '@angular/**',
    'pdfjs-dist/**',
    'material-design-lite/**'
  ], {cwd: "node_modules/**"}) /* Glob required here. */
  .pipe(gulp.dest(`${ __dirname }/build/lib`));
});

gulp.task("files", () => {
  return gulp.src([
    'pdf-test.pdf'
  ])
    .pipe(gulp.dest("build"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
  gulp.watch([`${ __dirname }/src/**/*.ts`], ['compile']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });

  gulp.watch([`${ __dirname }/src/**/*.html`, `${ __dirname }/src/**/*.css`], ['resources']).on('change', function (e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
});

/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources', 'libs', 'files'], () => {
  console.log("Building the project ...");
});

gulp.task("builder", function() {

  var builder = new Builder();

  builder.loadConfig('./system.config.js')
    .then(function() {
      builder.buildStatic('./build/main.js', './build/app.min.js')
        .then(function () {
          console.log('Build complete');
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

gulp.task('gh-pages', ['compile-and-inline-html', 'builder']);