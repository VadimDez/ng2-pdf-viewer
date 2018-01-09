<h1 align="center">Angular2+ PDF Viewer</h1>
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
  <a href="https://gitter.im/ngx-pdf-viewer/Lobby" title="Gitter">
    <img src="https://img.shields.io/gitter/room/nwjs/nw.js.svg" alt="Gitter"/>
  </a>
</p>

> PDF Viewer Component for Angular 2+

### Demo page

[https://vadimdez.github.io/ng2-pdf-viewer/](https://vadimdez.github.io/ng2-pdf-viewer/)

### Blog post

[https://medium.com/@vadimdez/render-pdf-in-angular-4-927e31da9c76](https://medium.com/@vadimdez/render-pdf-in-angular-4-927e31da9c76)

## Install

```
npm install ng2-pdf-viewer --save
```

## Usage

In case you're using ```systemjs``` see configuration [here](https://github.com/VadimDez/ng2-pdf-viewer/blob/master/SYSTEMJS.md).

Add ```PdfViewerModule``` to your module's ```imports```

```js
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

```js
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
* [[rotation]](#rotation)
* [[zoom]](#zoom)
* [[original-size]](#original-size)
* [[fit-to-page]](#fit-to-page)
* [[show-all]](#show-all)
* [[autoresize]](#autoresize)
* [(after-load-complete)](#after-load-complete)
* [(error)](#error)
* [(on-progress)](#on-progress)

#### [src]
*accepts: string, object, UInt8Array*

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
 
 See more attributes [here](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L83-L130).


#### [page]
_number_

Page number

```
[page]="1"
```
supports two way data binding as well
```
[(page)]="pageVariable"
```

#### [stick-to-page]
_boolean_

Sticks view to the page. Works in combination with `[show-all]="true"` and `page`.

```
[stick-to-page]="true"
```

#### [render-text]
_boolean_

Enable text rendering, allows to select text
```
[render-text]="true"
```

#### [external-link-target]
_string_

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
_number_

Rotate PDF

*Allowed step is 90 degree, ex. 0, 90, 180*
```
[rotation]="90"
```

#### [zoom]
_number_

Zoom pdf
```
[zoom]="0.5"
```

#### [original-size]
_boolean_

if set to *true* - size will be as same as original document

if set to *false* - size will be as same as container block

```
[original-size]="true"
```

#### [fit-to-page]
_boolean_

Works in combination with `[original-size]="true"`. You can show your document in original size, and make sure that it's not bigger then container block.

```
[fit-to-page]="false"
```

#### [show-all]
_boolean_

Show single or all pages altogether

```
[show-all]="true"
```

#### [autoresize]
_boolean_

Turn on or off auto resize.

**!Important** To make `[autoresize]` work - make sure that `[original-size]="false"` and `pdf-viewer` tag has `max-width` or `dipslay` are set.

```
[autoresize]="true"
```

#### (after-load-complete)

Get PDF information with callback

First define callback function "callBackFn" in your controller,
```
callBackFn(pdf: PDFDocumentProxy) {
   // do anything with "pdf"
}
```

And then use it in your template:
``` 
(after-load-complete)="callBackFn($event)"
```

#### (error)

Error handling callback

Define callback in your component's class

```ts
onError(error: any) {
  // do anything
}
```

Then add it to `pdf-component` in component's template

```html
(error)="onError($event)"
```

#### (on-progress)

Loading progress callback - provides progress information `total` and `loaded` bytes. Is called several times during pdf loading phase.

Define callback in your component's class

```ts
onProgress(progressData: PDFProgressData) {
  // do anything with progress data. For example progress indicator
}
```

Then add it to `pdf-component` in component's template

```html
(on-progress)="onProgress($event)"
```

### Render local PDF file

In your `html` template add `input`:

```html
<input (change)="onFileSelected()" type="file" id="file">
```

and then add `onFileSelected` method to your component:

```ts
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


### Set custom path to the worker

By default the `worker` is loaded from `cdnjs.cloudflare.com`.

In your code update `path` to the worker to be for example `/pdf.worker.js` 
```ts
(<any>window).PDFJS.workerSrc = '/pdf.worker.js';
```
*This should be set before `pdf-viewer` component is rendered.*


## Contribute
[See CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](https://tldrlegal.com/license/mit-license) © [Vadym Yatsyuk](https://github.com/vadimdez)

