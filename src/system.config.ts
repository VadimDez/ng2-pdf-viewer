(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': './',
    'rxjs': 'lib/rxjs',
    '@angular': 'lib/@angular',
    'pdfjs-dist': 'lib/pdfjs-dist',
    //'pdf-viewer': './dist/'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'pdfjs-dist': { main: '/build/pdf.js', defaultExtension: 'js' },
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