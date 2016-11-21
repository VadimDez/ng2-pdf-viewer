"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.pdfSrc = './pdf-test.pdf';
        this.page = 1;
        this.rotation = 0;
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
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pdf-viewer-app',
            template: "\n    <div mdl class=\"mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button\">\n        <header class=\"mdl-layout__header\">\n            <div class=\"mdl-layout__header-row\">\n                <span class=\"mdl-layout-title\">ng2-pdf-viewer</span>\n            </div>\n        </header>\n        <main class=\"mdl-layout__content\">\n            <div class=\"page-content\">\n\n                <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                    <input [(ngModel)]=\"pdfSrc\" [value]=\"pdfSrc\" class=\"mdl-textfield__input\" type=\"text\" id=\"pdf-src\">\n                    <label class=\"mdl-textfield__label\" for=\"pdf-src\">Set URL of the PDF file</label>\n                </div>\n\n                <div class=\"select-file__container\">\n                    <p>\n                        Or render preview by just selecting PDF file (no upload required)\n                    </p>\n                    <input (change)=\"onFileSelected()\" type=\"file\" id=\"file\">\n                </div>\n\n                <div>\n                    <label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" for=\"original-size\">\n                        <input type=\"checkbox\" id=\"original-size\" class=\"mdl-switch__input\"\n                               [checked]=\"originalSize\"\n                               [(ngModel)]=\"originalSize\">\n                        <span class=\"mdl-switch__label\">Original size</span>\n                    </label>\n                </div>\n\n                <div>\n                    <label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" for=\"show-all\">\n                        <input type=\"checkbox\" id=\"show-all\" class=\"mdl-switch__input\"\n                               [checked]=\"showAll\"\n                               [(ngModel)]=\"showAll\"\n                        >\n                        <span class=\"mdl-switch__label\">Show all pages</span>\n                    </label>\n                </div>\n\n                <div mdl>\n                    <button (click)=\"incrementZoom(-0.1)\" class=\"mdl-button mdl-js-button\">\n                        -\n                    </button>\n                    <div class=\"page-number mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                        <input [(ngModel)]=\"zoom\"\n                               [value]=\"zoom\"\n                               class=\"mdl-textfield__input\"\n                               type=\"number\"\n                               pattern=\"-?[0-9]*(\\.[0-9]+)?\"\n                               id=\"pdf-zoom\"\n                        >\n                        <label class=\"mdl-textfield__label\" for=\"pdf-zoom\">Zoom</label>\n                        <span class=\"mdl-textfield__error\">Input is not a number!</span>\n                    </div>\n                    <button (click)=\"incrementZoom(0.1)\" class=\"mdl-button mdl-js-button\">\n                        +\n                    </button>\n                </div>\n\n                <div mdl *ngIf=\"!showAll\">\n                    <button (click)=\"incrementPage(-1)\" class=\"mdl-button mdl-js-button\">\n                        Previous\n                    </button>\n                    <div class=\"page-number mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                        <input [(ngModel)]=\"page\"\n                               [value]=\"page\"\n                               class=\"mdl-textfield__input\"\n                               type=\"number\"\n                               pattern=\"-?[0-9]*(\\.[0-9]+)?\"\n                               id=\"pdf-page\"\n                        >\n                        <label class=\"mdl-textfield__label\" for=\"pdf-page\">Page</label>\n                        <span class=\"mdl-textfield__error\">Input is not a number!</span>\n                    </div>\n                    <span *ngIf=\"pdf\">of {{ pdf.numPages }}</span>\n                    <button (click)=\"incrementPage(1)\" class=\"mdl-button mdl-js-button\">\n                        Next\n                    </button>\n                </div>\n\n                <div mdl>\n                    <button (click)=\"rotate(-90)\" class=\"mdl-button mdl-js-button\">Rotate left</button>\n                    <div class=\"page-number mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                        <input [value]=\"rotation\"\n                               class=\"mdl-textfield__input\"\n                               type=\"number\"\n                               disabled\n                        >\n                        <label class=\"mdl-textfield__label\" for=\"pdf-page\">Angle</label>\n                    </div>\n                    <button (click)=\"rotate(90)\" class=\"mdl-button mdl-js-button\">Rotate right</button>\n                </div>\n\n                <pdf-viewer [src]=\"pdfSrc\"\n                            [(page)]=\"page\"\n                            [rotation]=\"rotation\"\n                            [original-size]=\"originalSize\"\n                            [show-all]=\"showAll\"\n                            [after-load-complete]=\"afterLoadComplete\"\n                            [zoom]=\"zoom\"\n                ></pdf-viewer>\n\n            </div>\n        </main>\n        <footer class=\"mdl-mini-footer\">\n            <div class=\"mdl-mini-footer__left-section\">\n                <div class=\"mdl-logo\">ng2-pdf-viewer</div>\n                <ul class=\"mdl-mini-footer__link-list\">\n                    <li><a href=\"https://github.com/VadimDez/ng2-pdf-viewer\">Github</a></li>\n                    <li><a href=\"https://github.com/VadimDez\">Vadym Yatsyuk</a></li>\n                </ul>\n            </div>\n        </footer>\n    </div>\n  ",
            styles: ["\n    .page-content {\n        padding-top: 10px;\n        width: 800px;\n        margin-left: auto;\n        margin-right: auto;\n    }\n\n    .select-file__container {\n        margin-top: 10px;\n        margin-bottom: 20px;\n    }\n    .select-file__container p {\n        margin-bottom: 0;\n    }\n\n    .page-number {\n        width: 50px;\n    }\n\n    pdf-viewer {\n        display: block;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
