# Changelog

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