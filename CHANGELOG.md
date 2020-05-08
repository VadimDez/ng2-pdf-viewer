# Changelog

## 6.3.0
* [[#601](https://github.com/VadimDez/ng2-pdf-viewer/issues/601)] - support for pdf.js v2.4.456

## 6.2.0
* [[#461](https://github.com/VadimDez/ng2-pdf-viewer/issues/461)] - peer dependency for pdfjs-dist
* [[c391f99](https://github.com/VadimDez/ng2-pdf-viewer/commit/c391f99c760f19398c6fb526c0ff6f0736c16da6)] - Removed peer dependencies

## 6.1.3
* [[#553](https://github.com/VadimDez/ng2-pdf-viewer/pull/553)] - Bugfix #539 Only emit pageChage on actual change
* [[#539](https://github.com/VadimDez/ng2-pdf-viewer/issues/539)] - [(page)] two way binding causes infinite loop

## 6.1.2
* [[#582](https://github.com/VadimDez/ng2-pdf-viewer/pull/582)] - Fix rotated PDF files have a scale computation issue
* [[#554](https://github.com/VadimDez/ng2-pdf-viewer/issues/554)] - Rotated PDF files have a scale computation issue

## 6.1.1
* [[a8ddd42](https://github.com/VadimDez/ng2-pdf-viewer/commit/a8ddd4295333cbd1f8e85ba454d484afa6039152)] - Downgrade Typescript for compatibility

## 6.1.0
* [[#569](https://github.com/VadimDez/ng2-pdf-viewer/pull/569)] - Update to angular 9
* [[#568](https://github.com/VadimDez/ng2-pdf-viewer/issues/568)] - Project seems be incompatible when used in an Angular 9 proejct

## 6.0.2
* [[#526](https://github.com/VadimDez/ng2-pdf-viewer/pull/526)] - Cancel downloading/rendering, clear rendered pdf

## 6.0.1
* [[#525](https://github.com/VadimDez/ng2-pdf-viewer/pull/525)] - cancel loading task before loading document
* [[#502](https://github.com/VadimDez/ng2-pdf-viewer/issues/502)] - Is it possible to terminate a page rendering?

## 6.0.0
* [[#445](https://github.com/VadimDez/ng2-pdf-viewer/pull/445)] - Issue #223 PR
* [[#223](https://github.com/VadimDez/ng2-pdf-viewer/issues/223)] - Update page number when scrolling on "show-all" mode
* [[#440](https://github.com/VadimDez/ng2-pdf-viewer/issues/440)] - Large PDF >300 pages, rendering problems
* [[#422](https://github.com/VadimDez/ng2-pdf-viewer/issues/422)] - Styling issue when trying to putting pdf viewer to right of html content
* [[#410](https://github.com/VadimDez/ng2-pdf-viewer/issues/410)] - Large Size PDF(pages) causes Browser Crash
* [[#394](https://github.com/VadimDez/ng2-pdf-viewer/issues/394)] - Calling this.pdf.pdfViewer.scrollPageIntoView({ pageNumber: 20 }); does not work
* [[#386](https://github.com/VadimDez/ng2-pdf-viewer/issues/386)] - Loading spinners never go away
* [[#337](https://github.com/VadimDez/ng2-pdf-viewer/issues/337)] - Avoid reloading after zoom in/out
* [[#299](https://github.com/VadimDez/ng2-pdf-viewer/issues/299)] - PDF not show when browser zoom is low or low resolution
* [[#261](https://github.com/VadimDez/ng2-pdf-viewer/issues/261)] - Last page never loads when zoom level is below ~0.4
* [[#244](https://github.com/VadimDez/ng2-pdf-viewer/issues/244)] - stick-to-page doesn't work
* [[#219](https://github.com/VadimDez/ng2-pdf-viewer/issues/219)] - Component stops rendering when display goes out of view
* [[#516](https://github.com/VadimDez/ng2-pdf-viewer/issues/516)] - Memory leak issue in IOS when open large PDF file
* [[#471](https://github.com/VadimDez/ng2-pdf-viewer/issues/471)] - ng2-pdf not rendering all pages
* [[#460](https://github.com/VadimDez/ng2-pdf-viewer/issues/460)] - How to disable scroll on page change?
* [[#449](https://github.com/VadimDez/ng2-pdf-viewer/issues/449)] - Blank page IOS
* [[#418](https://github.com/VadimDez/ng2-pdf-viewer/issues/418)] - Can't disable scrollPageIntoView while changing pages in Safari
* [[#414](https://github.com/VadimDez/ng2-pdf-viewer/issues/414)] - PDFDocumentProxy : destroy() doesn't work : memory bloat
* [[#403](https://github.com/VadimDez/ng2-pdf-viewer/issues/403)] - <!doctype html> issue
* [[#397](https://github.com/VadimDez/ng2-pdf-viewer/issues/397)] - stick-to-page does not work
* [[#392](https://github.com/VadimDez/ng2-pdf-viewer/issues/392)] - Memory issue
* [[#388](https://github.com/VadimDez/ng2-pdf-viewer/issues/388)] - Tracking page
* [[#372](https://github.com/VadimDez/ng2-pdf-viewer/issues/372)] - Max size / Scroll bars not visible
* [[#360](https://github.com/VadimDez/ng2-pdf-viewer/issues/360)] - [show-all]="true", [stick-to-page]="true", [page]="boundValue" does not work if I set 'max-height' to 'pdf-viewer'

### Breaking change
Now with the use of `CSS` you need to define dimensions (for example: `height`) of the `pdf-viewer` container element. (`pdf-viewer` should become container with scrollbar) This will improve `pdf-viewer` **performance** and eneble all the **features**.

```css
pdf-viewer {
  /* define height */
  height: 700px;
  /* or use flex for example */
  flex: 1;
}
```

## 5.3.4
* [[#508](https://github.com/VadimDez/ng2-pdf-viewer/pull/508)] - Fix PDF scaling when rotating
* [[#509](https://github.com/VadimDez/ng2-pdf-viewer/pull/509)] - add removePageBorders option
* [[#510](https://github.com/VadimDez/ng2-pdf-viewer/pull/510)] - Emit pageChange on MultiPageViewer

## 5.3.3
* Update PDFJS dependency
* [[#499](https://github.com/VadimDez/ng2-pdf-viewer/pull/499)] - update page number upon page changing event
* [[#474](https://github.com/VadimDez/ng2-pdf-viewer/issues/474)] - Clicking a link in the pdf performs a page change but does not emit a (pageChange) event

## 5.3.2
 * [[#487](https://github.com/VadimDez/ng2-pdf-viewer/issues/487)] - Deprecated API usage: getViewport is called with obsolete arguments

## 5.3.1
* Updated Angular to version 8
* [[#482](https://github.com/VadimDez/ng2-pdf-viewer/issues/482)] - Compatibility with Angular 8
* [[#475](https://github.com/VadimDez/ng2-pdf-viewer/issues/475)] - Conflict pdf.js 2.0.943 and quill.js 1.3.6

## 5.3.0
* [[#465](https://github.com/VadimDez/ng2-pdf-viewer/pull/465)] - fix: Listen for textlayerrendered events from eventBus
* Changed init approach: Do not initialize viewer in the hidden views (first try)

## 5.2.4
* [[#457](https://github.com/VadimDez/ng2-pdf-viewer/pull/457)] - fix: allow pdfjs typings peer dependency v2
* [[#408](https://github.com/VadimDez/ng2-pdf-viewer/issues/408)] - Regression: Version 5.2 Broke (page-rendered)
* [[#420](https://github.com/VadimDez/ng2-pdf-viewer/pull/420)] - PR for Issue 408

## 5.2.3
* [[#402](https://github.com/VadimDez/ng2-pdf-viewer/issues/402)] - Page is not working

## 5.2.2
* [[#409](https://github.com/VadimDez/ng2-pdf-viewer/pull/409)] - suppress z-lib warning in angular6+
* [[#322](https://github.com/VadimDez/ng2-pdf-viewer/issues/322)] - Angular 6 support

## 5.2.1
* [[#371](https://github.com/VadimDez/ng2-pdf-viewer/issues/371)] - Cannot read property 'version' of undefined when rendering on the server

## 5.2.0
* [[#393](https://github.com/VadimDez/ng2-pdf-viewer/pull/393)] - Fix for broken search functionality when showPage=false
* [[#375](https://github.com/VadimDez/ng2-pdf-viewer/issues/375)] - Search and highlight not working when [show-all]="false" [page]="4"
* [[#314](https://github.com/VadimDez/ng2-pdf-viewer/issues/314)] - Search functionality not working if i set show all false.
* [[#293](https://github.com/VadimDez/ng2-pdf-viewer/issues/293)] - Highlight on single page load

## 5.1.3
* [[#390](https://github.com/VadimDez/ng2-pdf-viewer/pull/390)] - enable setting render text mode to enchanced

You can now set text rendering mode to RenderTextMode.DISABLED, RenderTextMode.ENABLED or RenderTextMode.ENHANCED

```
[render-text-mode]="1"
```

## 5.1.2
* [[#366](https://github.com/VadimDez/ng2-pdf-viewer/pull/366)] - add text-layer-rendered event emitter

## 5.1.1
* [[#338](https://github.com/VadimDez/ng2-pdf-viewer/pull/347)] - support for non-latin characters
* [[#324](https://github.com/VadimDez/ng2-pdf-viewer/issues/324)] - PDF preview does not display Chinese

## 5.1.0
* [[#338](https://github.com/VadimDez/ng2-pdf-viewer/pull/338)] - Upgrade dependency
* [[#336](https://github.com/VadimDez/ng2-pdf-viewer/pull/336)] - fix: Cleanup unused pdf document proxies

## 5.0.1
* [[#311](https://github.com/VadimDez/ng2-pdf-viewer/pull/311)] - Update pdfjs
* [[#308](https://github.com/VadimDez/ng2-pdf-viewer/issues/308)] - Not working on IOS on both Chrome and Safari 
* [[#302](https://github.com/VadimDez/ng2-pdf-viewer/issues/302)] - ng2-pdf-viewer dependencies have conflicts with webpack >= 3 

### Breaking changes
PDFJS is not attached to the `window` therefore setting custom path to the worker changed to `window.pdfWorkerSrc`:

```typescript
(<any>window).pdfWorkerSrc = '/pdf.worker.js';
```

## 4.1.2
* [[#281](https://github.com/VadimDez/ng2-pdf-viewer/pull/281)] - Fix error on resize during loading of pdf

## 4.1.1
* [[#260](https://github.com/VadimDez/ng2-pdf-viewer/issues/260)] - Public PDFFindController
* [[#279](https://github.com/VadimDez/ng2-pdf-viewer/pull/279)] - make pdfFindController public

#### Features

`pdfFindController` is now public, that means you can now execute a search on the pdf.

In your component's ts file:

* Add reference to `pdf-viewer`,
* then when needed execute search()

```ts
@ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

search(stringToSearch: string) {
  this.pdfComponent.pdfFindController.executeCommand('find', {
    caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true, query: stringToSearch
  });
}
```


## 4.1.0
* [[#274](https://github.com/VadimDez/ng2-pdf-viewer/issues/274)] - Page two way data binding. Do not reset page to 1.
* [[#265](https://github.com/VadimDez/ng2-pdf-viewer/issues/265)] - adding after-render-complete emitter
* [[#81](https://github.com/VadimDez/ng2-pdf-viewer/issues/81)] - Add a rendered event in promise

Page rendered event is added, use `(page-rendered)=callback($event)` 

## 4.0.0
* [[#268](https://github.com/VadimDez/ng2-pdf-viewer/pull/268)] - Feature/restructure
* [[#209](https://github.com/VadimDez/ng2-pdf-viewer/issues/209)] - Angular 5

### Breaking change
Location of bundles is changed.

Therefor `SYSTEMJS` config is now updated to:

```js
var map = {
    'ng2-pdf-viewer': 'node_modules/ng2-pdf-viewer/bundles',
    'pdfjs-dist': 'node_modules/pdfjs-dist'
}
```

and then add to ```packages```

```js
var packages = {
    'ng2-pdf-viewer': { defaultExtension: 'js' },
    'pdfjs-dist': { defaultExtension: 'js' }
}
```


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
