(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': './',
    'rxjs': 'lib/rxjs',
    '@angular': 'lib/@angular',
    'pdfjs-dist': 'lib/pdfjs-dist/'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' }
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

  var config = {
    map: map,
    packages: packages
  };

  SystemJS.config(config);

})(this);