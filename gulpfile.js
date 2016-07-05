/**
 * Created by Vadym Yatsyuk on 22/06/16
 */

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const typescript = require('gulp-typescript');
const systemjsBuilder = require('systemjs-builder');
const uglify = require('gulp-uglify');
const htmlreplace = require('gulp-html-replace');
const path = require('path');

var tsProject = typescript.createProject('tsconfig.json', {
  typescript: require('typescript'),
  outFile: 'app.js'
});

gulp.task('tscompile', function () {
  var tsResult = gulp.src(['main.ts', './src/**/*.ts'])
    .pipe(typescript(tsProject));

  return tsResult.js.pipe(gulp.dest('./dist'));
});

gulp.task('app-bundle', function () {
  var tsProject = typescript.createProject('tsconfig.json', {
    typescript: require('typescript'),
    outFile: 'app.js'
  });

  var tsResult = gulp.src(['main.ts', 'src/**/*.ts'])
    .pipe(typescript(tsProject));

  return tsResult.js.pipe(concat('app.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('vendor-bundle', function() {
  gulp.src([
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/rxjs/bundles/Rx.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/@angular/common/bundles/common.umd.min.js',
    'node_modules/@angular/compiler/bundles/compiler.umd.min.js',
    'node_modules/@angular/core/bundles/core.umd.min.js',
    'node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js',
    'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
    'node_modules/pdfjs-dist/build/pdf.combined.js'
  ])
    .pipe(concat('vendors.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('boot-bundle', function() {
  gulp.src('config.prod.js')
    .pipe(concat('boot.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
      'vendor': 'vendors.min.js',
      'app': 'app.min.js',
      'boot': 'boot.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', done => {
  var packages = {
    'rxjs': { defaultExtension: 'js' }
  };
  
  ['core', 'common', 'compiler', 'platform-browser', 'platform-browser-dynamic'].forEach(name => {
    packages[`@angular/${ name }`] = { main: 'index.js', defaultExtension: 'js' }; 
  });
  
  
  var builder = new systemjsBuilder({
    paths: {
      './*': './*',
      '*': 'node_modules/*'
    },
    packageConfigPaths: [
      'node_modules/@angular/*/package.json',
      'node_modules/*/package.json'
    ],
    packages
  });
  
  builder.buildStatic(
    path.join(__dirname, 'main.ts'),
    path.join(__dirname, 'dist', 'app.js'),
    {
      format: 'cjs',
      minify: false,
      mangle: false,
      sourceMaps: false
    })
    .then(() => done())
    .catch(err => done(err));
});