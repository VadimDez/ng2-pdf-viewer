System.register(['@angular/core', 'pdfjs-dist'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, pdfjs_dist_1;
    var PdfViewerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (pdfjs_dist_1_1) {
                pdfjs_dist_1 = pdfjs_dist_1_1;
            }],
        execute: function() {
            PdfViewerComponent = (function () {
                function PdfViewerComponent(element) {
                    this.element = element;
                    this._initialPage = 1;
                }
                Object.defineProperty(PdfViewerComponent.prototype, "src", {
                    set: function (_src) {
                        this._src = _src;
                        this.fn();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PdfViewerComponent.prototype, "initialPage", {
                    set: function (_initialPage) {
                        this._initialPage = _initialPage;
                        if (this._pdf && this.isValidPageNumber(_initialPage)) {
                            this.renderPage(_initialPage);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                PdfViewerComponent.prototype.fn = function () {
                    var _this = this;
                    pdfjs_dist_1.default.getDocument(this._src).then(function (pdf) {
                        _this._pdf = pdf;
                        if (!_this.isValidPageNumber(_this._initialPage)) {
                            _this._initialPage = 1;
                        }
                        _this.renderPage(_this._initialPage);
                    });
                };
                PdfViewerComponent.prototype.isValidPageNumber = function (page) {
                    return this._pdf.numPages >= page && page >= 1;
                };
                PdfViewerComponent.prototype.renderPage = function (initialPage) {
                    var _this = this;
                    this._pdf.getPage(initialPage).then(function (page) {
                        var scale = 1;
                        var viewport = page.getViewport(scale);
                        var canvas = _this.element.nativeElement.querySelector('canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        page.render({
                            canvasContext: context,
                            viewport: viewport
                        });
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], PdfViewerComponent.prototype, "src", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], PdfViewerComponent.prototype, "initialPage", null);
                PdfViewerComponent = __decorate([
                    core_1.Component({
                        selector: 'pdf-viewer',
                        templateUrl: '/src/pdf-viewer/pdf-viewer.component.html'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], PdfViewerComponent);
                return PdfViewerComponent;
            }());
            exports_1("PdfViewerComponent", PdfViewerComponent);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZGYtdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVdBO2dCQU1FLDRCQUFvQixPQUFtQjtvQkFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtvQkFGL0IsaUJBQVksR0FBVyxDQUFDLENBQUM7Z0JBSWpDLENBQUM7Z0JBR0Qsc0JBQUksbUNBQUc7eUJBQVAsVUFBUSxJQUFJO3dCQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO3dCQUVqQixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ1osQ0FBQzs7O21CQUFBO2dCQUdELHNCQUFJLDJDQUFXO3lCQUFmLFVBQWdCLFlBQVk7d0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO3dCQUVqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ2hDLENBQUM7b0JBQ0gsQ0FBQzs7O21CQUFBO2dCQUVPLCtCQUFFLEdBQVY7b0JBQUEsaUJBVUM7b0JBVEMsb0JBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7d0JBQ3pDLEtBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUVoQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMvQyxLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzt3QkFDeEIsQ0FBQzt3QkFFRCxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTyw4Q0FBaUIsR0FBekIsVUFBMEIsSUFBWTtvQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO2dCQUVPLHVDQUFVLEdBQWxCLFVBQW1CLFdBQW1CO29CQUF0QyxpQkFjQztvQkFiQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFTO3dCQUM1QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ2QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNoRSxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QyxNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQ2hDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQzt3QkFFOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQzs0QkFDVixhQUFhLEVBQUUsT0FBTzs0QkFDdEIsUUFBUSxFQUFFLFFBQVE7eUJBQ25CLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQTlDRDtvQkFBQyxZQUFLLEVBQUU7Ozs2REFBQTtnQkFPUjtvQkFBQyxZQUFLLEVBQUU7OztxRUFBQTtnQkF0QlY7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsWUFBWTt3QkFDdEIsV0FBVyxFQUFFLDJDQUEyQztxQkFDekQsQ0FBQzs7c0NBQUE7Z0JBMkRGLHlCQUFDO1lBQUQsQ0FBQyxBQXpERCxJQXlEQztZQXpERCxtREF5REMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB2YWRpbWRleiBvbiAyMS8wNi8xNi5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFBERkpTIGZyb20gJ3BkZmpzLWRpc3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwZGYtdmlld2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcvc3JjL3BkZi12aWV3ZXIvcGRmLXZpZXdlci5jb21wb25lbnQuaHRtbCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBQZGZWaWV3ZXJDb21wb25lbnQge1xuXG4gIHByaXZhdGUgX3NyYzogc3RyaW5nO1xuICBwcml2YXRlIF9wZGY6IGFueTtcbiAgcHJpdmF0ZSBfaW5pdGlhbFBhZ2U6IG51bWJlciA9IDE7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7XG5cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBzcmMoX3NyYykge1xuICAgIHRoaXMuX3NyYyA9IF9zcmM7XG5cbiAgICB0aGlzLmZuKCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgaW5pdGlhbFBhZ2UoX2luaXRpYWxQYWdlKSB7XG4gICAgdGhpcy5faW5pdGlhbFBhZ2UgPSBfaW5pdGlhbFBhZ2U7XG5cbiAgICBpZiAodGhpcy5fcGRmICYmIHRoaXMuaXNWYWxpZFBhZ2VOdW1iZXIoX2luaXRpYWxQYWdlKSkge1xuICAgICAgdGhpcy5yZW5kZXJQYWdlKF9pbml0aWFsUGFnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmbigpIHtcbiAgICBQREZKUy5nZXREb2N1bWVudCh0aGlzLl9zcmMpLnRoZW4oKHBkZjogYW55KSA9PiB7XG4gICAgICB0aGlzLl9wZGYgPSBwZGY7XG5cbiAgICAgIGlmICghdGhpcy5pc1ZhbGlkUGFnZU51bWJlcih0aGlzLl9pbml0aWFsUGFnZSkpIHtcbiAgICAgICAgdGhpcy5faW5pdGlhbFBhZ2UgPSAxO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlclBhZ2UodGhpcy5faW5pdGlhbFBhZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1ZhbGlkUGFnZU51bWJlcihwYWdlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fcGRmLm51bVBhZ2VzID49IHBhZ2UgJiYgcGFnZSA+PSAxO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQYWdlKGluaXRpYWxQYWdlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wZGYuZ2V0UGFnZShpbml0aWFsUGFnZSkudGhlbigocGFnZTogYW55KSA9PiB7XG4gICAgICB2YXIgc2NhbGUgPSAxO1xuICAgICAgdmFyIHZpZXdwb3J0ID0gcGFnZS5nZXRWaWV3cG9ydChzY2FsZSk7XG4gICAgICB2YXIgY2FudmFzID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG4gICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgY2FudmFzLmhlaWdodCA9IHZpZXdwb3J0LmhlaWdodDtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHZpZXdwb3J0LndpZHRoO1xuXG4gICAgICBwYWdlLnJlbmRlcih7XG4gICAgICAgIGNhbnZhc0NvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgIHZpZXdwb3J0OiB2aWV3cG9ydFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0iXX0=