(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': './build/',
    'rxjs': './build/lib/rxjs',
    '@angular': './build/lib/@angular',
    'pdfjs-dist': './build/lib/pdfjs-dist',
    //'pdf-viewer': './dist/'

    // material
    '@angular/material': './build/lib/@angular/material/bundles/material.umd.min.js',
    '@angular/animations': './build/lib/@angular/animations/bundles/animations.umd.min.js',
    '@angular/animations/browser': './build/lib/@angular/animations/bundles/animations-browser.umd.min.js',
    '@angular/platform-browser/animations': './build/lib/@angular/platform-browser/bundles/platform-browser-animations.umd.min.js',
    '@angular/common/http': './build/lib/@angular/common/bundles/common-http.umd.min.js',
    'tslib': './build/lib/tslib/tslib.js',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    // 'pdf-viewer': { main: 'pdf-viewer.component.js', defaultExtension: 'js' }
  };

  [
    'common',
    'compiler',
    'core',
    'forms',
    'platform-browser',
    'platform-browser-dynamic'
  ].forEach(function (pkgName) {
    packages['@angular/' + pkgName] = { main: 'bundles/' +  pkgName + '.umd.js', defaultExtension: 'js' };
  });

  [
    'platform',
    'a11y',
    'bidi',
    'coercion',
    'keycodes',
    'overlay',
    'portal',
    'collections',
    'observers',
    'accordion',
    'scrolling',
    'layout',
    'table',
    'stepper'
  ].forEach(function (name) {
    map['@angular/cdk/' + name] = './build/lib/@angular/cdk/bundles/cdk-' + name + '.umd.js';
  });

  var config = {
    map: map,
    packages: packages
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) {
    global.filterSystemConfig(config);
  }

  System.config(config);

})(this);