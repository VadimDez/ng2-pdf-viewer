import { Injectable } from '@angular/core';

@Injectable()
export class PanService {
  enablePan = false;

  private isPanning = false;
  private mouseStartX = 0;
  private mouseStartY = 0;
  private scrollLeft = 0;
  private scrollTop = 0;

  startPan(event: MouseEvent, container: HTMLElement): void {
    if (!this.enablePan) {
      return;
    }

    this.isPanning = true;

    this.mouseStartX = event.clientX;
    this.mouseStartY = event.clientY;
    this.scrollLeft = container.scrollLeft;
    this.scrollTop = container.scrollTop;

    container.style.cursor = 'grabbing';

    event.preventDefault();
  }

  endPan(container: HTMLElement): void {
    if (!this.enablePan) {
      return;
    }

    this.isPanning = false;
    container.style.cursor = 'grab';
  }

  pan(event: MouseEvent, container: HTMLElement): void {
    if (!this.enablePan) {
      return;
    }

    if (!this.isPanning) {
      return;
    }

    const dx = event.clientX - this.mouseStartX;
    const dy = event.clientY - this.mouseStartY;
    container.scrollLeft = this.scrollLeft - dx;
    container.scrollTop = this.scrollTop - dy;
  }
}
