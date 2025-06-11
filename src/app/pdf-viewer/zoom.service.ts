import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private zoomMutex = false;
  private ratioX = 0;
  private ratioY = 0;

  zoom = 1;

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

  private zoomAtCursor(event: WheelEvent): void {
    const ZOOM_STEP = 0.1;
    const delta = event.deltaY < 0 ? 1 + ZOOM_STEP : 1 - ZOOM_STEP;
    this.zoom *= delta;
    this.zoom = Math.max(0.25, Math.min(this.zoom, 5)); // clamp scale

    this.triggerUpdateSize.next();
  }

  private lastDistance = 0;
  private isPinching = false;

  private onTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      this.isPinching = true;
      this.lastDistance = this.getDistance(event.touches[0], event.touches[1]);
      event.preventDefault(); // prevent default zoom behavior
    }
  };

  private onTouchMove = (event: TouchEvent) => {
    if (this.isPinching && event.touches.length === 2) {
      const currentDistance = this.getDistance(
        event.touches[0],
        event.touches[1]
      );

      if (this.lastDistance !== 0) {
        const scaleChange = currentDistance / this.lastDistance;

        if (Math.abs(scaleChange - 1) > 0.01) {
          this.zoom = Math.min(Math.max(this.zoom * scaleChange, 0.5), 4); // clamp between 0.5 and 4
          this.lastDistance = currentDistance;
          this.triggerUpdateSize.next();
        }
      }

      event.preventDefault(); // prevent scroll or native zoom
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
