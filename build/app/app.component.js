"use strict";
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.pdfSrc = './pdf-test.pdf';
        this.page = 1;
        this.zoom = 1.0;
        this.originalSize = false;
        this.showAll = true;
        this.afterLoadComplete = this.afterLoadComplete.bind(this);
    }
    AppComponent.prototype.incrementPage = function (amount) {
        this.page += amount;
    };
    AppComponent.prototype.incrementZoom = function (amount) {
        this.zoom += amount;
    };
    AppComponent.prototype.afterLoadComplete = function (pdf) {
        this.pdf = pdf;
    };
    AppComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'pdf-viewer-app',
                    templateUrl: './app.component.html',
                    styleUrls: ['./app.component.css']
                },] },
    ];
    AppComponent.ctorParameters = [];
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map