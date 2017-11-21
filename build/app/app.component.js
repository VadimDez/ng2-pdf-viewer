"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.incrementPage = function (amount) {
        this.page += amount;
    };
    AppComponent.prototype.incrementZoom = function (amount) {
        this.zoom += amount;
    };
    AppComponent.prototype.rotate = function (angle) {
        this.rotation += angle;
    };
    AppComponent.prototype.onFileSelected = function () {
        var _this = this;
        var $img = document.querySelector('#file');
        if (typeof (FileReader) !== 'undefined') {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.pdfSrc = e.target.result;
            };
            reader.readAsArrayBuffer($img.files[0]);
        }
    };
    AppComponent.prototype.afterLoadComplete = function (pdf) {
        this.pdf = pdf;
        this.isLoaded = true;
    };
    AppComponent.prototype.onError = function (error) {
        this.error = error;
    };
    AppComponent.prototype.onProgress = function (progressData) {
        this.progressData = progressData;
        this.isLoaded = false;
        this.error = null;
    };
    AppComponent.prototype.getInt = function (value) {
        return Math.round(value);
    };
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map