import { TestBed } from '@angular/core/testing';
import { ZoomService } from './zoom.service';

describe(ZoomService.name, () => {
  let service: ZoomService;
  let container: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomService);

    container = document.createElement('div');
    container.style.width = '1000px';
    container.style.height = '1000px';
    container.style.overflow = 'scroll';
    container.innerHTML = '<div style="width: 2000px; height: 2000px;"></div>';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('initSettings', () => {
    it('should add event listeners to the container', () => {
      const addEventListenerSpy = spyOn(container, 'addEventListener');

      service.initSettings(container, true, true);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'wheel',
        jasmine.any(Function),
        { passive: false }
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'touchstart',
        jasmine.any(Function),
        { passive: false }
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'touchmove',
        jasmine.any(Function),
        { passive: false }
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'touchend',
        jasmine.any(Function)
      );
    });
  });

  describe('zoomAtCursor', () => {
    it('should zoom in and out based on wheel event', () => {
      const wheelEvent = new WheelEvent('wheel', { deltaY: -100 });
      service.zoom = 1;

      service['zoomAtCursor'](wheelEvent);
      expect(service.zoom).toBeGreaterThan(1);

      wheelEvent.initEvent('wheel', true, true);
      Object.defineProperty(wheelEvent, 'deltaY', { value: 100 });
      service['zoomAtCursor'](wheelEvent);
      expect(service.zoom).toBeLessThan(1);
    });
  });

  describe('saveScrollPosition', () => {
    it('should save the scroll position ratios', () => {
      container.scrollLeft = 500;
      container.scrollTop = 500;

      service.saveScrollPosition(container);

      expect(service['ratioX']).toBeCloseTo(0.25);
      expect(service['ratioY']).toBeCloseTo(0.25);
    });
  });

  describe('restoreScrollPosition', () => {
    it('should restore the scroll position', (done) => {
      service['ratioX'] = 0.25;
      service['ratioY'] = 0.25;

      service.restoreScrollPosition(container);

      requestAnimationFrame(() => {
        expect(container.scrollLeft).toBeCloseTo(500);
        expect(container.scrollTop).toBeCloseTo(500);
        done();
      });
    });
  });

  describe('removeListeners', () => {
    it('should remove event listeners from the container', () => {
      const removeEventListenerSpy = spyOn(container, 'removeEventListener');
      service.removeListeners(container);

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'touchstart',
        jasmine.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'touchmove',
        jasmine.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'touchend',
        jasmine.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'wheel',
        jasmine.any(Function)
      );
    });
  });

  describe('onTouchStart', () => {
    it('should set isPinching to true and calculate distance', () => {
      const touch1 = new Touch({
        identifier: 0,
        target: container,
        clientX: 0,
        clientY: 0,
      });
      const touch2 = new Touch({
        identifier: 1,
        target: container,
        clientX: 100,
        clientY: 0,
      });
      const touchEvent = new TouchEvent('touchstart', {
        touches: [touch1, touch2],
      });

      service['onTouchStart'](touchEvent);

      expect(service['isPinching']).toBeTrue();
      expect(service['lastDistance']).toBe(100);
    });
  });

  describe('onTouchMove', () => {
    it('should adjust zoom based on pinch gesture', () => {
      service['isPinching'] = true;
      service['lastDistance'] = 100;
      service.zoom = 1;
      const touch1 = new Touch({
        identifier: 0,
        target: container,
        clientX: 0,
        clientY: 0,
      });
      const touch2 = new Touch({
        identifier: 1,
        target: container,
        clientX: 200,
        clientY: 0,
      });
      const touchEvent = new TouchEvent('touchmove', {
        touches: [touch1, touch2],
      });

      service['onTouchMove'](touchEvent);

      expect(service.zoom).toBeGreaterThan(1);
      expect(service['lastDistance']).toBe(200);
    });
  });

  describe('onTouchEnd', () => {
    it('should reset isPinching and lastDistance', () => {
      service['isPinching'] = true;
      service['lastDistance'] = 100;

      const touchEvent = new TouchEvent('touchend', { touches: [] });

      service['onTouchEnd'](touchEvent);

      expect(service['isPinching']).toBeFalse();
      expect(service['lastDistance']).toBe(0);
    });
  });
});
