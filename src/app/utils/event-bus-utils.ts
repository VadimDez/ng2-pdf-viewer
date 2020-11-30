export function _createEventBus(pdfJsViewer: any): any {
  const globalEventBus = new pdfJsViewer.EventBus(true);
  attachDOMEventsToEventBus(globalEventBus);

  return globalEventBus;
}

function attachDOMEventsToEventBus(eventBus: any) {
  eventBus.on('documentload', () => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('documentload', true, true, {});
    window.dispatchEvent(event);
  });
  eventBus.on('pagerendered', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagerendered', true, true, {
      pageNumber: evt.pageNumber,
      cssTransform: evt.cssTransform
    });
    evt.source.div.dispatchEvent(event);
  });
  eventBus.on('textlayerrendered', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('textlayerrendered', true, true, {
      pageNumber: evt.pageNumber
    });
    evt.source.textLayerDiv.dispatchEvent(event);
  });
  eventBus.on('pagechanging', evt => {
    const event = document.createEvent('UIEvents');
    event.initEvent('pagechanging', true, true);
    /* tslint:disable:no-string-literal */
    event['pageNumber'] = evt.pageNumber;
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('pagesinit', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagesinit', true, true, null);
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('pagesloaded', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagesloaded', true, true, {
      pagesCount: evt.pagesCount
    });
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('scalechange', evt => {
    const event = document.createEvent('UIEvents');
    event.initEvent('scalechange', true, true);
    /* tslint:disable:no-string-literal */
    event['scale'] = evt.scale;
    /* tslint:disable:no-string-literal */
    event['presetValue'] = evt.presetValue;
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('updateviewarea', evt => {
    const event = document.createEvent('UIEvents');
    event.initEvent('updateviewarea', true, true);
    event['location'] = evt.location;
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('find', evt => {
    if (evt.source === window) {
      return; // event comes from FirefoxCom, no need to replicate
    }
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('find' + evt.type, true, true, {
      query: evt.query,
      phraseSearch: evt.phraseSearch,
      caseSensitive: evt.caseSensitive,
      highlightAll: evt.highlightAll,
      findPrevious: evt.findPrevious
    });
    window.dispatchEvent(event);
  });
  eventBus.on('attachmentsloaded', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('attachmentsloaded', true, true, {
      attachmentsCount: evt.attachmentsCount
    });
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('sidebarviewchanged', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('sidebarviewchanged', true, true, {
      view: evt.view
    });
    evt.source.outerContainer.dispatchEvent(event);
  });
  eventBus.on('pagemode', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagemode', true, true, {
      mode: evt.mode
    });
    evt.source.pdfViewer.container.dispatchEvent(event);
  });
  eventBus.on('namedaction', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('namedaction', true, true, {
      action: evt.action
    });
    evt.source.pdfViewer.container.dispatchEvent(event);
  });
  eventBus.on('presentationmodechanged', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('presentationmodechanged', true, true, {
      active: evt.active,
      switchInProgress: evt.switchInProgress
    });
    window.dispatchEvent(event);
  });
  eventBus.on('outlineloaded', evt => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('outlineloaded', true, true, {
      outlineCount: evt.outlineCount
    });
    evt.source.container.dispatchEvent(event);
  });
}

export const createEventBus = _createEventBus;
