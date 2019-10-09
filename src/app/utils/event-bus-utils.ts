export function _createEventBus(pdfJsViewer: any): any {
  const globalEventBus = new pdfJsViewer.EventBus(true);
  attachDOMEventsToEventBus(globalEventBus);

  return globalEventBus;
}

function attachDOMEventsToEventBus(eventBus: any) {
  eventBus.on('documentload', function() {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('documentload', true, true, {});
    window.dispatchEvent(event);
  });
  eventBus.on('pagerendered', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagerendered', true, true, {
      pageNumber: evt.pageNumber,
      cssTransform: evt.cssTransform
    });
    evt.source.div.dispatchEvent(event);
  });
  eventBus.on('textlayerrendered', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('textlayerrendered', true, true, {
      pageNumber: evt.pageNumber
    });
    evt.source.textLayerDiv.dispatchEvent(event);
  });
  eventBus.on('pagechanging', function(evt) {
    const event = document.createEvent('UIEvents');
    event.initUIEvent('pagechanging', true, true, window, 0);
    event['pageNumber'] = evt.pageNumber;
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('pagesinit', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagesinit', true, true, null);
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('pagesloaded', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagesloaded', true, true, {
      pagesCount: evt.pagesCount
    });
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('scalechange', function(evt) {
    const event = document.createEvent('UIEvents');
    event.initUIEvent('scalechange', true, true, window, 0);
    event['scale'] = evt.scale;
    event['presetValue'] = evt.presetValue;
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('updateviewarea', function(evt) {
    const event = document.createEvent('UIEvents');
    event.initUIEvent('updateviewarea', true, true, window, 0);
    event['location'] = evt.location;
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('find', function(evt) {
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
  eventBus.on('attachmentsloaded', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('attachmentsloaded', true, true, {
      attachmentsCount: evt.attachmentsCount
    });
    evt.source.container.dispatchEvent(event);
  });
  eventBus.on('sidebarviewchanged', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('sidebarviewchanged', true, true, {
      view: evt.view
    });
    evt.source.outerContainer.dispatchEvent(event);
  });
  eventBus.on('pagemode', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagemode', true, true, {
      mode: evt.mode
    });
    evt.source.pdfViewer.container.dispatchEvent(event);
  });
  eventBus.on('namedaction', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('namedaction', true, true, {
      action: evt.action
    });
    evt.source.pdfViewer.container.dispatchEvent(event);
  });
  eventBus.on('presentationmodechanged', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('presentationmodechanged', true, true, {
      active: evt.active,
      switchInProgress: evt.switchInProgress
    });
    window.dispatchEvent(event);
  });
  eventBus.on('outlineloaded', function(evt) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('outlineloaded', true, true, {
      outlineCount: evt.outlineCount
    });
    evt.source.container.dispatchEvent(event);
  });
}

export const createEventBus = _createEventBus;
