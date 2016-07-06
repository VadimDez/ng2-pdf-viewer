System.register(['@angular/core', 'ng2-pdf-viewer'], function(exports_1, context_1) {
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
    var core_1, ng2_pdf_viewer_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_pdf_viewer_1_1) {
                ng2_pdf_viewer_1 = ng2_pdf_viewer_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
                    this.page = 1;
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'pdf-viewer-app',
                        templateUrl: './src/app/app.component.html',
                        directives: [ng2_pdf_viewer_1.PdfViewerComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFhQTtnQkFBQTtvQkFDRSxXQUFNLEdBQVcsd0RBQXdELENBQUM7b0JBQzFFLFNBQUksR0FBVyxDQUFDLENBQUM7Z0JBQ25CLENBQUM7Z0JBVEQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsZ0JBQWdCO3dCQUMxQixXQUFXLEVBQUUsOEJBQThCO3dCQUMzQyxVQUFVLEVBQUUsQ0FBQyxtQ0FBa0IsQ0FBQztxQkFDakMsQ0FBQzs7Z0NBQUE7Z0JBS0YsbUJBQUM7WUFBRCxDQUFDLEFBSEQsSUFHQztZQUhELHVDQUdDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdmFkaW1kZXogb24gMjEvMDYvMTYuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gaW1wb3J0IHsgUGRmVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9wZGYtdmlld2VyL3BkZi12aWV3ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBkZlZpZXdlckNvbXBvbmVudCB9IGZyb20gJ25nMi1wZGYtdmlld2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGRmLXZpZXdlci1hcHAnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3JjL2FwcC9hcHAuY29tcG9uZW50Lmh0bWwnLFxuICBkaXJlY3RpdmVzOiBbUGRmVmlld2VyQ29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHBkZlNyYzogc3RyaW5nID0gJ2h0dHBzOi8vdmFkaW1kZXouZ2l0aHViLmlvL25nMi1wZGYtdmlld2VyL3BkZi10ZXN0LnBkZic7XG4gIHBhZ2U6IG51bWJlciA9IDE7XG59Il19