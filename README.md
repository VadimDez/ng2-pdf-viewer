<h1 align="center">Angular PDF Viewer</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/ng2-pdf-viewer">
    <img src="https://img.shields.io/npm/dm/ng2-pdf-viewer.svg?style=flat" alt="downloads">
  </a>
  <a href="https://badge.fury.io/js/ng2-pdf-viewer">
    <img src="https://badge.fury.io/js/ng2-pdf-viewer.svg" alt="npm version">
  </a>
  <a href="https://gitter.im/ngx-pdf-viewer/Lobby" title="Gitter">
    <img src="https://img.shields.io/gitter/room/nwjs/nw.js.svg" alt="Gitter"/>
  </a>
  <a href="https://www.paypal.me/vadimdez" title="Donate to this project using Paypal">
    <img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" />
  </a>
</p>

> PDF Viewer Component for Angular 5+

### Demo page

[https://vadimdez.github.io/ng2-pdf-viewer/](https://vadimdez.github.io/ng2-pdf-viewer/)

#### Stackblitz Example

[https://stackblitz.com/edit/ng2-pdf-viewer](https://stackblitz.com/edit/ng2-pdf-viewer)

### Blog post

[https://medium.com/@vadimdez/render-pdf-in-angular-4-927e31da9c76](https://medium.com/@vadimdez/render-pdf-in-angular-4-927e31da9c76)

## Overview

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Render local PDF file](#render-local-pdf-file)
- [Set custom path to the worker](#set-custom-path-to-the-worker)
- [Search in the PDF](#search-in-the-pdf)
- [Contribute](#contribute)

## Install

### Angular >= 12

```
npm install ng2-pdf-viewer
```

> Partial Ivy compilated library bundles.

### Angular >= 4

```
npm install ng2-pdf-viewer@^7.0.0
```

### Angular < 4

```
npm install ng2-pdf-viewer@~3.0.8
```

## Usage

_In case you're using `systemjs` see configuration [here](https://github.com/VadimDez/ng2-pdf-viewer/blob/master/SYSTEMJS.md)._

Add `PdfViewerModule` to your module's `imports`

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [BrowserModule, PdfViewerModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

And then use it in your component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'example-app',
  template: ` <pdf-viewer [src]="pdfSrc" [render-text]="true" [original-size]="false" style="width: 400px; height: 500px"></pdf-viewer> `,
})
export class AppComponent {
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
}
```

## Options

- [[src]](#src)
- [[(page)]](#page)
- [[stick-to-page]](#stick-to-page)
- [[external-link-target]](#external-link-target)
- [[render-text]](#render-text)
- [[render-text-mode]](#render-text-mode)
- [[rotation]](#rotation)
- [[zoom]](#zoom)
- [[zoom-scale]](#zoom-scale)
- [[original-size]](#original-size)
- [[fit-to-page]](#fit-to-page)
- [[show-all]](#show-all)
- [[autoresize]](#autoresize)
- [[c-maps-url]](#c-maps-url)
- [[show-borders]](#show-borders)
- [(after-load-complete)](#after-load-complete)
- [(page-rendered)](#page-rendered)
- [(text-layer-rendered)](#text-layer-rendered)
- [(error)](#error)
- [(on-progress)](#on-progress)

#### [src]

| Property | Type                         | Required |
| -------- | ---------------------------- | -------- |
| [src]    | _string, object, UInt8Array_ | Required |

Pass pdf location

```
[src]="'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'"
```

For more control you can pass options object to `[src]`. [See other attributes for the object here](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L130-L222).

Options object for loading protected PDF would be:

```js
{
 url: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
 withCredentials: true
}
```

#### [page]

| Property           | Type     | Required                                                                |
| ------------------ | -------- | ----------------------------------------------------------------------- |
| [page] or [(page)] | _number_ | _Required_ with [show-all]="false" or _Optional_ with [show-all]="true" |

Page number

```
[page]="1"
```

supports two way data binding as well

```
[(page)]="pageVariable"
```

If you want that the `two way data binding` actually updates your `page` variable on page change/scroll - you have to be sure that you define the height of the container, for example:

```css
pdf-viewer {
  height: 100vh;
}
```

#### [stick-to-page]

| Property        | Type      | Required   |
| --------------- | --------- | ---------- |
| [stick-to-page] | _boolean_ | _Optional_ |

Sticks view to the page. Works in combination with `[show-all]="true"` and `page`.

```
[stick-to-page]="true"
```

#### [render-text]

| Property      | Type      | Required   |
| ------------- | --------- | ---------- |
| [render-text] | _boolean_ | _Optional_ |

Enable text rendering, allows to select text

```
[render-text]="true"
```

#### [render-text-mode]

| Property           | Type             | Required   |
| ------------------ | ---------------- | ---------- |
| [render-text-mode] | _RenderTextMode_ | _Optional_ |

Used in combination with `[render-text]="true"`

Controls if the text layer is enabled, and the selection mode that is used.

`0 = RenderTextMode.DISABLED` - disable the text selection layer

`1 = RenderTextMode.ENABLED` - enables the text selection layer

`2 = RenderTextMode.ENHANCED` - enables enhanced text selection

```
[render-text-mode]="1"
```

#### [external-link-target]

| Property               | Type     | Required   |
| ---------------------- | -------- | ---------- |
| [external-link-target] | _string_ | _Optional_ |

Used in combination with `[render-text]="true"`

Link target

- `blank`
- `none`
- `self`
- `parent`
- `top`

```
[external-link-target]="'blank'"
```

#### [rotation]

| Property   | Type     | Required   |
| ---------- | -------- | ---------- |
| [rotation] | _number_ | _Optional_ |

Rotate PDF

_Allowed step is 90 degree, ex. 0, 90, 180_

```
[rotation]="90"
```

#### [zoom]

| Property | Type     | Required   |
| -------- | -------- | ---------- |
| [zoom]   | _number_ | _Optional_ |

Zoom pdf

```
[zoom]="0.5"
```

#### [zoom-scale]

| Property     | Type                                      | Required   |
| ------------ | ----------------------------------------- | ---------- |
| [zoom-scale] | _'page-width'\|'page-fit'\|'page-height'_ | _Optional_ |

Defines how the Zoom scale is computed when `[original-size]="false"`, by default set to 'page-width'.

- _'page-width'_ with zoom of 1 will display a page width that take all the possible horizontal space in the container

- _'page-height'_ with zoom of 1 will display a page height that take all the possible vertical space in the container

- _'page-fit'_ with zoom of 1 will display a page that will be scaled to either width or height to fit completely in the container

```
[zoom-scale]="'page-width'"
```

#### [original-size]

| Property        | Type      | Required   |
| --------------- | --------- | ---------- |
| [original-size] | _boolean_ | _Optional_ |

- if set to _true_ - size will be as same as original document
- if set to _false_ - size will be as same as container block

```
[original-size]="true"
```

#### [fit-to-page]

| Property      | Type      | Required   |
| ------------- | --------- | ---------- |
| [fit-to-page] | _boolean_ | _Optional_ |

Works in combination with `[original-size]="true"`. You can show your document in original size, and make sure that it's not bigger then container block.

```
[fit-to-page]="false"
```

#### [show-all]

| Property   | Type      | Required   |
| ---------- | --------- | ---------- |
| [show-all] | _boolean_ | _Optional_ |

Show single or all pages altogether

```
[show-all]="true"
```

#### [autoresize]

| Property     | Type      | Required   |
| ------------ | --------- | ---------- |
| [autoresize] | _boolean_ | _Optional_ |

Turn on or off auto resize.

**!Important** To make `[autoresize]` work - make sure that `[original-size]="false"` and `pdf-viewer` tag has `max-width` or `display` are set.

```
[autoresize]="true"
```

### [isZoomOptimization]

| Property             | Type      | Required |
| -------------------- | --------- | -------- |
| [isZoomOptimization] | _boolean_ | Optional |

Default value: true. It improves the zoom keeping the view in the same position calculating the scrollbars positions before and after the zooming.
It's always true if [isWheelZoom] is enabled.

```
[isZoomOptimization]="true"
```

### [isWheelZoom]

| Property      | Type      | Required |
| ------------- | --------- | -------- |
| [isWheelZoom] | _boolean_ | Optional |

Default value: true. It allows to zoom via the mouse wheel, optionally the zoom can be performed using or not the Ctrl Key depending on [isWheelCtrlZoom].

```
[isWheelZoom]="true"
```

### [isWheelCtrlZoom]

| Property          | Type      | Required |
| ----------------- | --------- | -------- |
| [isWheelCtrlZoom] | _boolean_ | Optional |

Default value: true. It allows to zoom via the mouse wheel keeping the Ctrl button pressed. If disabled, the mouse wheel will zoom instead of scrolling the bars.

```
[isWheelCtrlZoom]="true"
```

#### [c-maps-url]

| Property     | Type     | Required |
| ------------ | -------- | -------- |
| [c-maps-url] | _string_ | Optional |

Url for non-latin characters source maps.

```
[c-maps-url]="'assets/cmaps/'"
```

Default url is: [https://unpkg.com/pdfjs-dist@2.0.550/cmaps/](https://unpkg.com/pdfjs-dist@2.0.550/cmaps/)

To serve cmaps on your own you need to copy `node_modules/pdfjs-dist/cmaps` to `assets/cmaps`.

### [show-borders]

| Property       | Type      | Required |
| -------------- | --------- | -------- |
| [show-borders] | _boolean_ | Optional |

Show page borders

```
[show-borders]="true"
```

#### (after-load-complete)

| Property              | Type       | Required   |
| --------------------- | ---------- | ---------- |
| (after-load-complete) | _callback_ | _Optional_ |

Get PDF information with callback

First define callback function "callBackFn" in your controller,

```typescript
callBackFn(pdf: PDFDocumentProxy) {
   // do anything with "pdf"
}
```

And then use it in your template:

```
(after-load-complete)="callBackFn($event)"
```

#### (page-rendered)

| Property        | Type       | Required   |
| --------------- | ---------- | ---------- |
| (page-rendered) | _callback_ | _Optional_ |

Get event when a page is rendered. Called for every page rendered.

Define callback in your component:

```typescript
pageRendered(e: CustomEvent) {
  console.log('(page-rendered)', e);
}
```

And then bind it to `<pdf-viewer>`:

```angular2html
(page-rendered)="pageRendered($event)"
```

#### (pages-initialized)

| Property            | Type       | Required   |
| ------------------- | ---------- | ---------- |
| (pages-initialized) | _callback_ | _Optional_ |

Get event when the pages are initialized.

Define callback in your component:

```typescript
pageInitialized(e: CustomEvent) {
  console.log('(pages-initialized)', e);
}
```

And then bind it to `<pdf-viewer>`:

```angular2html
(pages-initialized)="pageInitialized($event)"
```

#### (text-layer-rendered)

| Property              | Type       | Required   |
| --------------------- | ---------- | ---------- |
| (text-layer-rendered) | _callback_ | _Optional_ |

Get event when a text layer is rendered.

Define callback in your component:

```typescript
textLayerRendered(e: CustomEvent) {
  console.log('(text-layer-rendered)', e);
}
```

And then bind it to `<pdf-viewer>`:

```angular2html
(text-layer-rendered)="textLayerRendered($event)"
```

#### (error)

| Property | Type       | Required   |
| -------- | ---------- | ---------- |
| (error)  | _callback_ | _Optional_ |

Error handling callback

Define callback in your component's class

```typescript
onError(error: any) {
  // do anything
}
```

Then add it to `pdf-component` in component's template

```html
(error)="onError($event)"
```

#### (on-progress)

| Property      | Type       | Required   |
| ------------- | ---------- | ---------- |
| (on-progress) | _callback_ | _Optional_ |

Loading progress callback - provides progress information `total` and `loaded` bytes. Is called several times during pdf loading phase.

Define callback in your component's class

```typescript
onProgress(progressData: PDFProgressData) {
  // do anything with progress data. For example progress indicator
}
```

Then add it to `pdf-component` in component's template

```html
(on-progress)="onProgress($event)"
```

## Render local PDF file

In your `html` template add `input`:

```html
<input (change)="onFileSelected()" type="file" id="file" />
```

and then add `onFileSelected` method to your component:

```typescript
onFileSelected() {
  let $img: any = document.querySelector('#file');

  if (typeof (FileReader) !== 'undefined') {
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.pdfSrc = e.target.result;
    };

    reader.readAsArrayBuffer($img.files[0]);
  }
}
```

## Set custom path to the worker

By default the `worker` is loaded from `cdn.jsdelivr.net`.

In your code update `path` to the worker to be for example `/pdf.worker.mjs`

```typescript
(window as any).pdfWorkerSrc = '/pdf.worker.mjs';
```

_This should be set before `pdf-viewer` component is rendered._

If you ever have a (super rare) edge case where you run in an environment that multiple
components are somehow loaded within the same web page, sharing the same window,
but using different versions of pdf.worker, support has been added. You can do the
above, except that you can append the specific version of pdfjs required and override the
custom path _just for that version_. This way setting the global window var won't conflict.

```typescript
(window as any)['pdfWorkerSrc2.14.305'] = '/pdf.worker.mjs';
```

## Search in the PDF

Use `eventBus` for the search functionality.

In your component's ts file:

- Add reference to `pdf-viewer` component,
- then when needed execute `search()` like this:

```typescript
@ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

search(stringToSearch: string) {
  this.pdfComponent.eventBus.dispatch('find', {
    query: stringToSearch, type: 'again', caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true
  });
}
```

## Contribute

[See CONTRIBUTING.md](CONTRIBUTING.md)

## Donation

If this project help you reduce time to develop, you can give me a cup of tea :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/vadimdez)

## License

[MIT](https://tldrlegal.com/license/mit-license) © [Vadym Yatsyuk](https://github.com/vadimdez)
