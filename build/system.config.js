(function () {
    var map = {
        'app': './',
        'rxjs': 'lib/rxjs',
        '@angular': 'lib/@angular',
        'pdfjs-dist': 'lib/pdfjs-dist/',
        '@angular/material': 'lib/@angular/material/bundles/material.umd.js',
        '@angular/animations': 'lib/@angular/animations/bundles/animations.umd.min.js',
        '@angular/animations/browser': 'lib/@angular/animations/bundles/animations-browser.umd.min.js',
        '@angular/platform-browser/animations': 'lib/@angular/platform-browser/bundles/platform-browser-animations.umd.min.js',
        '@angular/common/http': 'lib/@angular/common/bundles/common-http.umd.min.js',
        'tslib': 'lib/tslib/tslib.js',
    };
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
        packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
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
        map["@angular/cdk/" + name] = "lib/@angular/cdk/bundles/cdk-" + name + ".umd.js";
    });
    var config = {
        map: map,
        packages: packages
    };
    SystemJS.config(config);
})();
//# sourceMappingURL=system.config.js.map