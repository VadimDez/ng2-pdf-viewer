(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': './build/',
    'rxjs': './build/lib/rxjs',
    '@angular': './build/lib/@angular',
    'pdfjs-dist': './build/lib/pdfjs-dist',
    //'pdf-viewer': './dist/'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'pdfjs-dist': { main: '/build/pdf.js', defaultExtension: 'js' },
    // 'pdf-viewer': { main: 'pdf-viewer.component.js', defaultExtension: 'js' }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function (pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
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