(function (global) {
    var map = {
        'app': './',
        'rxjs': 'lib/rxjs',
        '@angular': 'lib/@angular',
        'pdfjs-dist': 'lib/pdfjs-dist',
    };
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'pdfjs-dist': { main: '/build/pdf.js', defaultExtension: 'js' },
    };
    [
        'common',
        'compiler',
        'core',
        'forms',
        'platform-browser',
        'platform-browser-dynamic'
    ].forEach(function (pkgName) {
        packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    });
    var config = {
        map: map,
        packages: packages
    };
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }
    SystemJS.config(config);
})(this);
//# sourceMappingURL=system.config.js.map