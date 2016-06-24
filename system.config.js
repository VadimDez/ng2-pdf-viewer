(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': '/',
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular',
    'pdfjs-dist': 'node_modules/pdfjs-dist/build',
    'ng2-pdf-viewer': 'node_modules/ng2-pdf-viewer'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'pdfjs-dist': { main: 'pdf.combined.js', defaultExtension: 'js' },
    'ng2-pdf-viewer': { main: 'dist/pdf-viewer.component.min.js' }
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