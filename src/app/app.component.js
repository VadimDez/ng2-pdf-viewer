System.register(['@angular/core', './../pdf-viewer/pdf-viewer.component'], function(exports_1, context_1) {
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
    var core_1, pdf_viewer_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (pdf_viewer_component_1_1) {
                pdf_viewer_component_1 = pdf_viewer_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.pdfSrc = '/pdf-test.pdf';
                    this.page = 1;
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'pdf-viewer-app',
                        templateUrl: '/src/app/app.component.html',
                        directives: [pdf_viewer_component_1.PdfViewerComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFZQTtnQkFBQTtvQkFDRSxXQUFNLEdBQVcsZUFBZSxDQUFDO29CQUNqQyxTQUFJLEdBQVcsQ0FBQyxDQUFDO2dCQUNuQixDQUFDO2dCQVREO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjt3QkFDMUIsV0FBVyxFQUFFLDZCQUE2Qjt3QkFDMUMsVUFBVSxFQUFFLENBQUMseUNBQWtCLENBQUM7cUJBQ2pDLENBQUM7O2dDQUFBO2dCQUtGLG1CQUFDO1lBQUQsQ0FBQyxBQUhELElBR0M7WUFIRCx1Q0FHQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHZhZGltZGV6IG9uIDIxLzA2LzE2LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBkZlZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vLi4vcGRmLXZpZXdlci9wZGYtdmlld2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BkZi12aWV3ZXItYXBwJyxcbiAgdGVtcGxhdGVVcmw6ICcvc3JjL2FwcC9hcHAuY29tcG9uZW50Lmh0bWwnLFxuICBkaXJlY3RpdmVzOiBbUGRmVmlld2VyQ29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHBkZlNyYzogc3RyaW5nID0gJy9wZGYtdGVzdC5wZGYnO1xuICBwYWdlOiBudW1iZXIgPSAxO1xufSJdfQ==