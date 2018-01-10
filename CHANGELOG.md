# Changelog

## 3.0.8
* [[#63](https://github.com/VadimDez/ng2-pdf-viewer/issues/63)] - How to scroll to page?
* [[#233](https://github.com/VadimDez/ng2-pdf-viewer/issues/233)] - Bookmark option

#### Features

Now both `pdfViewer` and `pdfLinkService` are public. 

You can now scroll to a page from code:

```ts
// define view child
@ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

// ...

scrollToPage(page: number) {
  this.pdfComponent.pdfViewer.scrollPageIntoView({
    pageNumber: page
  });
}
```

## 3.0.6
* [[#200](https://github.com/VadimDez/ng2-pdf-viewer/issues/200)] - PDFDocumentProxy, PDFProgressData are undefined for compiler

Now you can import types where you need them directly from 'ng2-pdf-viewer' package:
```ts
import { PDFDocumentProxy, PDFProgressData } from 'ng2-pdf-viewer';
```

## 3.0.5
* [[#238](https://github.com/VadimDez/ng2-pdf-viewer/pull/238)] - added @types/pdf as peer dependency

## 3.0.4
* [[#162](https://github.com/VadimDez/ng2-pdf-viewer/issues/162)] - Worker Source
* [[#232](https://github.com/VadimDez/ng2-pdf-viewer/pull/232)] - Don't overwrite PDFJS.workerSrc if already set
* [[#226](https://github.com/VadimDez/ng2-pdf-viewer/issues/226)] - Update Size scale Error
* [[#237](https://github.com/VadimDez/ng2-pdf-viewer/pull/237)] - Prevent throwing error: "PDFViewer._setScale: '0' is an unknown zoom value"
* [[#182](https://github.com/VadimDez/ng2-pdf-viewer/issues/182)] - Documentation: Load preview for local files

#### Set custom path for worker:
In your code update `path` to the worker to be `/pdf.worker.js` 
```ts
(<any>window).PDFJS.workerSrc = '/pdf.worker.js';
```
*This should be set before `pdf-viewer` component is rendered.*

## 3.0.3
* [[#168](https://github.com/VadimDez/ng2-pdf-viewer/issues/168)] - Dependency to a prebuilt-version of pdf.js (pdfjs-dist)
* [[#195](https://github.com/VadimDez/ng2-pdf-viewer/issues/195)] - progressData.total is undefined
* [[#222](https://github.com/VadimDez/ng2-pdf-viewer/issues/222)] - [render-text]="false" is not working


## 3.0.2
* [[#173](https://github.com/VadimDez/ng2-pdf-viewer/issues/173)] - SSR support

## 3.0.1
* [[#194](https://github.com/VadimDez/ng2-pdf-viewer/pull/194)] - Fit original document into the viewport.
* [[#206](https://github.com/VadimDez/ng2-pdf-viewer/pull/206)] - Updated Readme for new [fit-to-page] option.

## 3.0.0
* [[#196](https://github.com/VadimDez/ng2-pdf-viewer/issues/196)] - ng2-pdf-viewer breaks the AOT build with Angular CLI 1.5.0
* [[#187](https://github.com/VadimDez/ng2-pdf-viewer/issues/187)] - ng build fails when AOT is enabled

#### BREAKING CHANGES
Now `ng2-pdf-viewer` exports `Module` instead of `Component`. That means you have to import `PdfViewerModule` instead of `PdfViewerComponent`.

```ts
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [PdfViewerModule]
})
export class YourModule() {}
```

## 2.0.3
* [[#190](https://github.com/VadimDez/ng2-pdf-viewer/pull/190)] - Fixed original size for showAll=false
* [[#57](https://github.com/VadimDez/ng2-pdf-viewer/issues/57)] - Disable autoresize

## 2.0.2
* [[#174](https://github.com/VadimDez/ng2-pdf-viewer/issues/174)] - 2.0.1 no more scrollbar while zooming

## 2.0.1
* [[#171](https://github.com/VadimDez/ng2-pdf-viewer/issues/171)] - AOT compile issue
* [[#172](https://github.com/VadimDez/ng2-pdf-viewer/issues/172)] - error

## 2.0.0
* [[#36](https://github.com/VadimDez/ng2-pdf-viewer/pull/36)] - Render text layer, hyperlinks, progressive loading, etc. 
* [[#18](https://github.com/VadimDez/ng2-pdf-viewer/issues/18)] - Is it possible to enable hyperlinks in the rendered PDF?
* [[#165](https://github.com/VadimDez/ng2-pdf-viewer/issues/165)] - pdf.js and pdf.worker.js using different versions
* [[#50](https://github.com/VadimDez/ng2-pdf-viewer/issues/50)] - Default Rotation
* [[#164](https://github.com/VadimDez/ng2-pdf-viewer/issues/164)] - Doesn't load blob url with 1.2.7
* [[#160](https://github.com/VadimDez/ng2-pdf-viewer/issues/160)] - some pdf showing in invert color
* [[#156](https://github.com/VadimDez/ng2-pdf-viewer/issues/156)] - Chrome error: Invalid SVG dimensions when 'original-size' = false
* [[#154](https://github.com/VadimDez/ng2-pdf-viewer/issues/154)] - Multiple display issues on Safari (iOS+Desktop)
* [[#147](https://github.com/VadimDez/ng2-pdf-viewer/issues/147)] - GET http://localhost:4200/nullUniGB-UCS2-H 404 (Not Found)
* [[#145](https://github.com/VadimDez/ng2-pdf-viewer/issues/145)] - Issue since update from 1.1.1 to 1.2.1 and not fixed in 1.2.2
* [[#144](https://github.com/VadimDez/ng2-pdf-viewer/issues/144)] - pdf annotation not shown in svg format
* [[#142](https://github.com/VadimDez/ng2-pdf-viewer/issues/142)] - Error: <svg:path> attribute d: Expected moveto path command ('M' or 'm'), "L 2318.47 6033.1…".
* [[#141](https://github.com/VadimDez/ng2-pdf-viewer/issues/141)] - Mirror/Upside Down document display
* [[#139](https://github.com/VadimDez/ng2-pdf-viewer/issues/139)] - PDF from pdfmake not loading
* [[#134](https://github.com/VadimDez/ng2-pdf-viewer/issues/134)] - PDF not loading. Shows black color
* [[#108](https://github.com/VadimDez/ng2-pdf-viewer/issues/108)] - PDF is loading as plain text as well as PDF, overlapping
* [[#92](https://github.com/VadimDez/ng2-pdf-viewer/issues/92)] - Performance error
* [[#80](https://github.com/VadimDez/ng2-pdf-viewer/issues/80)] - One by one page 

## 1.2.7
Updated dependencies

## 1.2.6
* [[#140](https://github.com/VadimDez/ng2-pdf-viewer/issues/140)] - Incorrect Font and Font Size Rendering
* [[#151](https://github.com/VadimDez/ng2-pdf-viewer/pull/151)] - force inline style to prevent css override font-family and font-size

## 1.2.5
* Update dist

## 1.2.4
* [[#150](https://github.com/VadimDez/ng2-pdf-viewer/issues/150)] - Used not minified version of pdfjs

## 1.2.3
* [[#146](https://github.com/VadimDez/ng2-pdf-viewer/issues/146)] - Load web worker separately, use minified version of pdfjs

## 1.2.2
* [[#94](https://github.com/VadimDez/ng2-pdf-viewer/issues/94)] - Add load progress callback

## 1.2.1
* [[#130](https://github.com/VadimDez/ng2-pdf-viewer/issues/130)] - ng build --prod fails for AOT

## 1.2.0
* [[#98](https://github.com/VadimDez/ng2-pdf-viewer/issues/98)] - PDF Auto Resize

## 1.1.5
* [[#124](https://github.com/VadimDez/ng2-pdf-viewer/issues/124)] - PDF background disappeared after update to 1.1.4

## 1.1.4
* Switched canvas to SVG rendering.
* Changed text layer rendering.
* [[#89](https://github.com/VadimDez/ng2-pdf-viewer/issues/89)] - Added `data-page-number` attribute

## 1.1.3
* [[#46](https://github.com/VadimDez/ng2-pdf-viewer/issues/46)] - Retina display support

## 1.1.2
* [[#112](https://github.com/VadimDez/ng2-pdf-viewer/issues/112)] - Error handling
* Updated documentation

## 1.1.1
* [[#111](https://github.com/VadimDez/ng2-pdf-viewer/issues/111)] - out of order

## 1.1.0
* [[#72](https://github.com/VadimDez/ng2-pdf-viewer/issues/72)] - Updated for Angular 4

## 1.0.2
* [[#54](https://github.com/VadimDez/ng2-pdf-viewer/issues/54)] - [show-all] is showing first two page only.

## 1.0.1
* [[#48](https://github.com/VadimDez/ng2-pdf-viewer/issues/48)] - Use ngOnchanges() instead of update() inside setters

## 1.0.0

#### Breaking changes
* [[#47](https://github.com/VadimDez/ng2-pdf-viewer/issues/47)] - Use @Output for after load events

Use `(after-load-complete)="afterLoadComplete($event)` instead of `[after-load-complete]="afterLoadComplete($event)` on `<pdf-viewer>`.

You do not need to bind your callback anymore.

Example of `afterLoadComplete` callback:

```ts
afterLoadComplete(pdf: PDFDocumentProxy) {
  this.pdf = pdf;
}
```

## 0.1.6
* [[#39](https://github.com/VadimDez/ng2-pdf-viewer/issues/39)] - background-color css causes PDF text to become invisible.
* [[#43](https://github.com/VadimDez/ng2-pdf-viewer/issues/43)] - PDF is drawn behind the container

## 0.1.5
* [[#37](https://github.com/VadimDez/ng2-pdf-viewer/issues/37)] - Fix the case where src is still not having a value

## 0.1.4
* [[#35](https://github.com/VadimDez/ng2-pdf-viewer/issues/35)] - New release causing blank pdf

## 0.1.3
* [[#29](https://github.com/VadimDez/ng2-pdf-viewer/issues/29)] - Make text selectable

## 0.1.2
* [[#28](https://github.com/VadimDez/ng2-pdf-viewer/issues/28)] - Fixed set initial page
* [[#30](https://github.com/VadimDez/ng2-pdf-viewer/issues/30)] - Do not reload PDF several times

## 0.1.1
* [[#27](https://github.com/VadimDez/ng2-pdf-viewer/issues/27)] - Added support for rotating

## 0.1.0

### Breaking changes
* [[#25](https://github.com/VadimDez/ng2-pdf-viewer/issues/25)] - Renamed "on-load-complete" to "after-load-complete"


## 0.0.15
* [[#26](https://github.com/VadimDez/ng2-pdf-viewer/issues/26)] - Re-added pdfjs as dependency

## 0.0.14

Re-installing of package may be required.

* [[#20](https://github.com/VadimDez/ng2-pdf-viewer/issues/20)] - Unable to declare in App Module
* Systemjs integration was changed, now you need to link ```dist/index.js``` file. See [[SYSTEMJS.md](https://github.com/VadimDez/ng2-pdf-viewer/blob/master/SYSTEMJS.md)]
* Support for AoT

## 0.0.13
* [[#22](https://github.com/VadimDez/ng2-pdf-viewer/issues/22)] - Support zoom
* other minor changes

## 0.0.12

* [[#7](https://github.com/VadimDez/ng2-pdf-viewer/issues/7)] - Return pdf info

## 0.0.11

* [[#10](https://github.com/VadimDez/ng2-pdf-viewer/issues/10)] - Need to Pass cookies with request for document src

## 0.0.10

* [[#11](https://github.com/VadimDez/ng2-pdf-viewer/issues/11)] - Update to Angular RC6
* [[#12](https://github.com/VadimDez/ng2-pdf-viewer/issues/12)] - Update how-to documentation to RC6
* Removed version lock from peer dependency

## 0.0.9

* [[#6](https://github.com/VadimDez/ng2-pdf-viewer/issues/6)] - Limit [page]
* Updated dependencies
* Minor changes

## 0.0.8

* [[#5](https://github.com/VadimDez/ng2-pdf-viewer/issues/5)] - Fixed web worker issue
* [[#4](https://github.com/VadimDez/ng2-pdf-viewer/issues/4)] - Updated angular dependencies to RC.5

## 0.0.7

* [#2](https://github.com/VadimDez/ng2-pdf-viewer/issues/2) - Added webpack compatibility
* Changed default value for original size flag 

## 0.0.6

* Added option to show one or all pdf pages altogether

## 0.0.5

* Updated dependency *pdfjs-dist*

## 0.0.4

* Updated peer dependency

## 0.0.3

* Added simple typings file
