<h1 align="center">Angular 5+ PDF Viewer</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/ng2-pdf-viewer">
    <img src="https://img.shields.io/npm/dm/ng2-pdf-viewer.svg?style=flat" alt="downloads">
  </a>
  <a href="https://badge.fury.io/js/ng2-pdf-viewer">
    <img src="https://badge.fury.io/js/ng2-pdf-viewer.svg" alt="npm version">
  </a>
  <a href="https://david-dm.org/vadimdez/ng2-pdf-viewer" title="dependencies status">
    <img src="https://david-dm.org/vadimdez/ng2-pdf-viewer/status.svg"/>
  </a>
  <a href="https://travis-ci.org/VadimDez/ng2-pdf-viewer" title="test">
    <img src="https://travis-ci.org/VadimDez/ng2-pdf-viewer.svg?branch=master"/>
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

* [Install](README.md#install)
* [Usage](README.md#usage)
* [Options](README.md#options)
* [Render local PDF file](README.md#render-local-pdf-file)
* [Set custom path to the worker](README.md#set-custom-path-to-the-worker)
* [Search in the PDF](README.md#search-in-the-pdf)
* [Contribute](README.md#contribute)

## Install

```
npm install ng2-pdf-viewer --save
```

*Note: For angular 4 or less use version `3.0.8`*

## Usage

*In case you're using ```systemjs``` see configuration [here](https://github.com/VadimDez/ng2-pdf-viewer/blob/master/SYSTEMJS.md).*

Add ```PdfViewerModule``` to your module's ```imports```

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [BrowserModule, PdfViewerModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

And then use it in your component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'example-app',
  template: `
  <div>
      <label>PDF src</label>
      <input type="text" placeholder="PDF src" [(ngModel)]="pdfSrc">
  </div>
  <pdf-viewer [src]="pdfSrc" 
              [render-text]="true"
              style="display: block;"
  ></pdf-viewer>
  `
})
export class AppComponent {
  pdfSrc: string = '/pdf-test.pdf';
}
```

## Options

* [[src]](#src)
* [[(page)]](#page)
* [[stick-to-page]](#stick-to-page)
* [[external-link-target]](#external-link-target)
* [[render-text]](#render-text)
* [[render-text-mode]](#render-text-mode)
* [[rotation]](#rotation)
* [[zoom]](#zoom)
* [[original-size]](#original-size)
* [[fit-to-page]](#fit-to-page)
* [[show-all]](#show-all)
* [[autoresize]](#autoresize)
* [[c-maps-url]](#c-maps-url)
* [(after-load-complete)](#after-load-complete)
* [(page-rendered)](#page-rendered)
* [(text-layer-rendered)](#text-layer-rendered)
* [(error)](#error)
* [(on-progress)](#on-progress)

#### [src]

| Property | Type | Required |
| --- | ---- | --- |
| [src] | *string, object, UInt8Array* | Required |

Pass pdf location
 
```
[src]="'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf'"
```

For more control you can pass options object to ```[src]```.

Options object for loading protected PDF would be
 
 ```js
 {
  url: 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf',
  withCredentials: true
 }
 ```
 
 See more attributes [here](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L107-L186).

#### [page]


| Property | Type | Required |
| --- | ---- | --- |
| [page] or [(page)] | *number* | *Required* with [show-all]="false" or *Optional* with [show-all]="true" |

Page number

```
[page]="1"
```
supports two way data binding as well
```
[(page)]="pageVariable"
```

#### [stick-to-page]

| Property | Type | Required |
| --- | ---- | --- |
| [stick-to-page] | *boolean* | *Optional* |

Sticks view to the page. Works in combination with `[show-all]="true"` and `page`.

```
[stick-to-page]="true"
```

#### [render-text]

| Property | Type | Required |
| --- | ---- | --- |
| [render-text] | *boolean* | *Optional* |

Enable text rendering, allows to select text
```
[render-text]="true"
```

#### [render-text-mode]

| Property | Type | Required |
| --- | ---- | --- |
| [render-text-mode] | *RenderTextMode* | *Optional* |

Used in combination with `[render-text]="true"`

Controls if the text layer is enabled, and the selection mode that is used.

`0 = RenderTextMode.DISABLED.` - disable the text selection layer

`1 = RenderTextMode.ENABLED.` - enables the text selection layer

`2 = RenderTextMode.ENHANCED` - enables enhanced text selection

```
[render-text-mode]="1"
```

#### [external-link-target]

| Property | Type | Required |
| --- | ---- | --- |
| [external-link-target] | *string* | *Optional* |

Used in combination with `[render-text]="true"`

Link target
* `blank`
* `none`
* `self`
* `parent`
* `top`
```
[external-link-target]="'blank'"
```

#### [rotation]

| Property | Type | Required |
| --- | ---- | --- |
| [rotation] | *number* | *Optional* |

Rotate PDF

*Allowed step is 90 degree, ex. 0, 90, 180*
```
[rotation]="90"
```

#### [zoom]

| Property | Type | Required |
| --- | ---- | --- |
| [zoom] | *number* | *Optional* |

Zoom pdf
```
[zoom]="0.5"
```

#### [original-size]

| Property | Type | Required |
| --- | ---- | --- |
| [original-size] | *boolean* | *Optional* |

* if set to *true* - size will be as same as original document
* if set to *false* - size will be as same as container block

```
[original-size]="true"
```

#### [fit-to-page]

| Property | Type | Required |
| --- | ---- | --- |
| [fit-to-page] | *boolean* | *Optional* |

Works in combination with `[original-size]="true"`. You can show your document in original size, and make sure that it's not bigger then container block.

```
[fit-to-page]="false"
```

#### [show-all]

| Property | Type | Required |
| --- | ---- | --- |
| [show-all] | *boolean* | *Optional* |

Show single or all pages altogether

```
[show-all]="true"
```

#### [autoresize]

| Property | Type | Required |
| --- | ---- | --- |
| [autoresize] | *boolean* | *Optional* |

Turn on or off auto resize.

**!Important** To make `[autoresize]` work - make sure that `[original-size]="false"` and `pdf-viewer` tag has `max-width` or `display` are set.

```
[autoresize]="true"
```

#### [c-maps-url]

| Property | Type | Required |
| --- | ---- | --- |
| [c-maps-url] | *string* | Optional |

Url for non-latin characters source maps.
```
[c-maps-url]="'assets/cmaps/'"
```

Default url is: [https://unpkg.com/pdfjs-dist@2.0.550/cmaps/](https://unpkg.com/pdfjs-dist@2.0.550/cmaps/)

To serve cmaps on your own you need to copy ```node_modules/pdfjs-dist/cmaps``` to ```assets/cmaps```.

#### (after-load-complete)

| Property | Type | Required |
| --- | ---- | --- |
| (after-load-complete) | *callback* | *Optional* |

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

| Property | Type | Required |
| --- | ---- | --- |
| (page-rendered) | *callback* | *Optional* |

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

#### (text-layer-rendered)

| Property | Type | Required |
| --- | ---- | --- |
| (text-layer-rendered) | *callback* | *Optional* |

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

| Property | Type | Required |
| --- | ---- | --- |
| (error) | *callback* | *Optional* |

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

| Property | Type | Required |
| --- | ---- | --- |
| (on-progress) | *callback* | *Optional* |

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
<input (change)="onFileSelected()" type="file" id="file">
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

By default the `worker` is loaded from `cdnjs.cloudflare.com`.

In your code update `path` to the worker to be for example `/pdf.worker.js` 
```typescript
(<any>window).pdfWorkerSrc = '/pdf.worker.js';
```
*This should be set before `pdf-viewer` component is rendered.*


## Search in the PDF

Use `pdfFindController` for search functionality.

In your component's ts file:

* Add reference to `pdf-viewer`,
* then when needed execute search()

```typescript
@ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

search(stringToSearch: string) {
  this.pdfComponent.pdfFindController.executeCommand('find', {
    caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true, query: stringToSearch
  });
}
```

## Contribute
[See CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](https://tldrlegal.com/license/mit-license) © [Vadym Yatsyuk](https://github.com/vadimdez)

