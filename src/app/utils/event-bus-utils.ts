import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import type { EventBus } from 'pdfjs-dist/web/pdf_viewer';

// interface EventBus {
//   on(eventName: string, listener: Function): void;
//   off(eventName: string, listener: Function): void;
//   _listeners: any;
//   dispatch(eventName: string, data: Object): void;
//   _on(eventName: any, listener: any, options?: null): void;
//   _off(eventName: any, listener: any, options?: null): void;
// }

interface CustomScaleChangeEvent extends UIEvent {
  scale?: number;
  presetValue?: string;
}

interface CustomUpdateViewAreaUIEvent extends UIEvent {
  location?: any;
}

interface CustomPageChangingEvent extends CustomEvent {
  detail: {
    pageNumber: number;
  };
}

export function createEventBus(pdfJsViewer: any, destroy$: Subject<void>) {
  const globalEventBus: EventBus = new pdfJsViewer.EventBus();
  attachDOMEventsToEventBus(globalEventBus, destroy$);
  return globalEventBus;
}

function attachDOMEventsToEventBus(
  eventBus: EventBus,
  destroy$: Subject<void>
): void {
  fromEvent(eventBus, 'documentload')
    .pipe(takeUntil(destroy$))
    .subscribe(() => {
      const event = new CustomEvent('documentload', {
        bubbles: true,
        cancelable: true,
        detail: {}
      });
      window.dispatchEvent(event);
    });

  fromEvent(eventBus, 'pagerendered')
    .pipe(takeUntil(destroy$))
    .subscribe(({ pageNumber, cssTransform, source }: any) => {
      const event = new CustomEvent('pagerendered', {
        bubbles: true,
        cancelable: true,
        detail: {
          pageNumber,
          cssTransform,
        }
      });
      source.div.dispatchEvent(event);
    });

  fromEvent(eventBus, 'textlayerrendered')
    .pipe(takeUntil(destroy$))
    .subscribe(({ pageNumber, source }: any) => {
      const event = new CustomEvent('textlayerrendered', {
        bubbles: true,
        cancelable: true,
        detail: {
          pageNumber
        }
      });
      source.textLayerDiv.dispatchEvent(event);
    });

  fromEvent(eventBus, 'pagechanging')
    .pipe(takeUntil(destroy$))
    .subscribe(({ pageNumber, source }: any) => {
      const event: CustomPageChangingEvent = new CustomEvent('pagechanging', {
        bubbles: true,
        cancelable: true,
        detail: {
          pageNumber
        }
      });
      event.detail.pageNumber = pageNumber;
      source.container.dispatchEvent(event);
    });

  fromEvent(eventBus, 'pagesinit')
    .pipe(takeUntil(destroy$))
    .subscribe(({ source }: any) => {
      const event = new CustomEvent('pagesinit', {
        bubbles: true,
        cancelable: true,
        detail: null
      });
      source.container.dispatchEvent(event);
    });

  fromEvent(eventBus, 'pagesloaded')
    .pipe(takeUntil(destroy$))
    .subscribe(({ pagesCount, source }: any) => {
      const event = new CustomEvent('pagesloaded', {
        bubbles: true,
        cancelable: true,
        detail: { pagesCount }
      });
      source.container.dispatchEvent(event);
    });

  fromEvent(eventBus, 'scalechange')
    .pipe(takeUntil(destroy$))
    .subscribe(({ scale, presetValue, source }: any) => {
      const event: CustomScaleChangeEvent = new UIEvent('scalechange', {
        bubbles: true,
        cancelable: true
      });
      event.scale = scale;
      event.presetValue = presetValue;
      source.container.dispatchEvent(event);
    });

  fromEvent(eventBus, 'updateviewarea')
    .pipe(takeUntil(destroy$))
    .subscribe(({ location, source }: any) => {
      const event: CustomUpdateViewAreaUIEvent = new UIEvent('updateviewarea', {
        bubbles: true,
        cancelable: true
      });
      event.location = location;
      source.container.dispatchEvent(event);
    });

  fromEvent(eventBus, 'find')
    .pipe(takeUntil(destroy$))
    .subscribe(
      ({
        source,
        type,
        query,
        phraseSearch,
        caseSensitive,
        highlightAll,
        findPrevious,
      }: any) => {
        if (source === window) {
          return; // event comes from FirefoxCom, no need to replicate
        }
        const event = new CustomEvent('find' + type, {
          bubbles: true,
          cancelable: true,
          detail: {
            query,
            phraseSearch,
            caseSensitive,
            highlightAll,
            findPrevious,
          }
        });
        window.dispatchEvent(event);
      }
    );

  fromEvent(eventBus, 'attachmentsloaded')
    .pipe(takeUntil(destroy$))
    .subscribe(({ attachmentsCount, source }: any) => {
      const event = new CustomEvent('attachmentsloaded', {
        bubbles: true,
        cancelable: true,
        detail: {
          attachmentsCount,
        }
      });
      source.container.dispatchEvent(event);
    });

  fromEvent(eventBus, 'sidebarviewchanged')
    .pipe(takeUntil(destroy$))
    .subscribe(({ view, source }: any) => {
      const event = new CustomEvent('sidebarviewchanged', {
        bubbles: true,
        cancelable: true,
        detail: { view }
      });
      source.outerContainer.dispatchEvent(event);
    });

  fromEvent(eventBus, 'pagemode')
    .pipe(takeUntil(destroy$))
    .subscribe(({ mode, source }: any) => {
      const event = new CustomEvent('pagemode', {
        bubbles: true,
        cancelable: true,
        detail: { mode }
      });
      source.pdfViewer.container.dispatchEvent(event);
    });

  fromEvent(eventBus, 'namedaction')
    .pipe(takeUntil(destroy$))
    .subscribe(({ action, source }: any) => {
      const event = new CustomEvent('namedaction', {
        bubbles: true,
        cancelable: true,
        detail: { action }
      });
      source.pdfViewer.container.dispatchEvent(event);
    });

  fromEvent(eventBus, 'presentationmodechanged')
    .pipe(takeUntil(destroy$))
    .subscribe(({ active, switchInProgress }: any) => {
      const event = new CustomEvent('presentationmodechanged', {
        bubbles: true,
        cancelable: true,
        detail: {
          active,
          switchInProgress,
        }
      });
      window.dispatchEvent(event);
    });

  fromEvent(eventBus, 'outlineloaded')
    .pipe(takeUntil(destroy$))
    .subscribe(({ outlineCount, source }: any) => {
      const event = new CustomEvent('outlineloaded', {
        bubbles: true,
        cancelable: true,
        detail: { outlineCount }
      });
      source.container.dispatchEvent(event);
    });
}
