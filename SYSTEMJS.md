In your ```system.config.js```

Append to ```map```

```js
var map = {
    'ng2-pdf-viewer': 'node_modules/ng2-pdf-viewer',
    'pdfjs-dist': 'node_modules/pdfjs-dist'
}
```

and then add to ```packages```

```js
var packages = {
    'ng2-pdf-viewer': { main: 'dist/index.js', defaultExtension: 'js' },
    'pdfjs-dist': { defaultExtension: 'js' }
}
```
