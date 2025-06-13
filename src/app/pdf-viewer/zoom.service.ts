import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private zoomMutex = false;
  zoom = 1;
  maxZoom = 0;
  minZoom = 0;

  private lastDistance = 0;
  private isPinching = false;
  private ratioX = 0;
  private ratioY = 0;

  readonly triggerUpdateSize = new BehaviorSubject<void>(undefined);

  initSettings(
    container: HTMLElement,
    isWheelZoom: boolean,
    isWheelCtrlZoom: boolean
  ): void {
    container.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        if (
          isWheelZoom &&
          ((isWheelCtrlZoom && e.ctrlKey) || !isWheelCtrlZoom)
        ) {
          e.preventDefault(); // prevent default zoom behavior
          this.zoomAtCursor(e);
        }
      },
      { passive: false }
    );

    container.addEventListener('touchstart', this.onTouchStart, {
      passive: false,
    });
    container.addEventListener('touchmove', this.onTouchMove, {
      passive: false,
    });
    container.addEventListener('touchend', this.onTouchEnd);
  }

  limitZoom(): void {
    if (this.minZoom === 0 && this.maxZoom === 0) {
      return;
    }

    if (this.maxZoom > 0 && this.zoom > this.maxZoom) {
      this.zoom = this.maxZoom;
    }

    if (this.minZoom > 0 && this.zoom < this.minZoom) {
      this.zoom = this.minZoom;
    }
  }

  private zoomAtCursor(event: WheelEvent): void {
    const ZOOM_STEP = 0.1;
    const delta = event.deltaY < 0 ? 1 + ZOOM_STEP : 1 - ZOOM_STEP;
    this.zoom *= delta;
    this.limitZoom();

    this.triggerUpdateSize.next();
  }

  private onTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      event.preventDefault(); // prevent default zoom behavior
      this.isPinching = true;
      this.lastDistance = this.getDistance(event.touches[0], event.touches[1]);
    }
  };

  private onTouchMove = (event: TouchEvent) => {
    if (this.isPinching && event.touches.length === 2) {
      event.preventDefault(); // prevent scroll or native zoom

      const currentDistance = this.getDistance(
        event.touches[0],
        event.touches[1]
      );

      if (this.lastDistance !== 0) {
        const scaleChange = currentDistance / this.lastDistance;

        this.zoom *= scaleChange;
        this.limitZoom();
        this.lastDistance = currentDistance;
        this.triggerUpdateSize.next();
      }
    }
  };

  private onTouchEnd = (event: TouchEvent) => {
    if (event.touches.length < 2) {
      this.isPinching = false;
      this.lastDistance = 0;
    }
  };

  private getDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;

    return Math.hypot(dx, dy);
  }

  saveScrollPosition(container: HTMLElement): void {
    if (this.zoomMutex) {
      return;
    }

    this.zoomMutex = true;

    const el = container;

    const ratioX = el.scrollLeft / el.scrollWidth;
    const ratioY = el.scrollTop / el.scrollHeight;

    this.ratioX = ratioX;
    this.ratioY = ratioY;
  }

  restoreScrollPosition(container: HTMLElement): void {
    const el = container;
    requestAnimationFrame(() => {
      el.scrollLeft = this.ratioX * el.scrollWidth;
      el.scrollTop = this.ratioY * el.scrollHeight;

      this.zoomMutex = false;
    });
  }

  removeListeners(container: HTMLElement): void {
    if (!container) {
      return;
    }

    container.removeEventListener('touchstart', this.onTouchStart);
    container.removeEventListener('touchmove', this.onTouchMove);
    container.removeEventListener('touchend', this.onTouchEnd);
    container.removeEventListener('wheel', this.zoomAtCursor);
  }
}
