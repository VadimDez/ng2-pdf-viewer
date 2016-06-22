/**
 * Created by Vadym Yatsyuk on 22/06/16
 */

var gulp = require('gulp');
const ts = require('gulp-typescript');

gulp.task('app-bundle', function () {
  var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
    outFile: 'app.js'
  });

  var tsResult = gulp.src(['main.ts', 'src/**/*.ts'])
    .pipe(ts(tsProject));

  return tsResult.js.pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('vendor-bundle', function() {
  gulp.src([
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.min.js',
    'node_modules/systemjs/dist/system-polyfills.js',
  ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

