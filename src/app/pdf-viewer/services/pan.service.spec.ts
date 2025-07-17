import { TestBed } from '@angular/core/testing';
import { PanService } from './pan.service';

describe(PanService.name, () => {
  let service: PanService;
  let container: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanService);

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

  describe('startPan', () => {
    it('should not start panning if enablePan is false', () => {
      service.enablePan = false;
      const event = new MouseEvent('mousedown');

      service.startPan(event, container);

      expect(service['isPanning']).toBeFalse();
    });

    it('should start panning and set initial values if enablePan is true', () => {
      service.enablePan = true;
      const event = new MouseEvent('mousedown', { clientX: 100, clientY: 200 });
      container.scrollLeft = 50;
      container.scrollTop = 60;
      spyOn(event, 'preventDefault');

      service.startPan(event, container);

      expect(service['isPanning']).toBeTrue();
      expect(service['mouseStartX']).toBe(100);
      expect(service['mouseStartY']).toBe(200);
      expect(service['scrollLeft']).toBe(50);
      expect(service['scrollTop']).toBe(60);
      expect(container.style.cursor).toBe('grabbing');
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('endPan', () => {
    it('should not end panning if enablePan is false', () => {
      service.enablePan = false;
      container.style.cursor = '';

      service.endPan(container);

      expect(service['isPanning']).toBeFalse();
      expect(container.style.cursor).toBe('');
    });

    it('should end panning and set cursor if enablePan is true', () => {
      service.enablePan = true;
      service['isPanning'] = true;
      container.style.cursor = 'grabbing';

      service.endPan(container);

      expect(service['isPanning']).toBeFalse();
      expect(container.style.cursor).toBe('grab');
    });
  });

  describe('pan', () => {
    it('should not pan if enablePan is false', () => {
      service.enablePan = false;
      const event = new MouseEvent('mousemove', { clientX: 120, clientY: 220 });
      container.scrollLeft = 10;
      container.scrollTop = 20;

      service.pan(event, container);

      expect(container.scrollLeft).toBe(10);
      expect(container.scrollTop).toBe(20);
    });

    it('should not pan if isPanning is false', () => {
      service.enablePan = true;
      service['isPanning'] = false;
      const event = new MouseEvent('mousemove', { clientX: 120, clientY: 220 });
      container.scrollLeft = 10;
      container.scrollTop = 20;

      service.pan(event, container);

      expect(container.scrollLeft).toBe(10);
      expect(container.scrollTop).toBe(20);
    });

    it('should update scrollLeft and scrollTop when panning', () => {
      service.enablePan = true;
      service['isPanning'] = true;
      service['mouseStartX'] = 100;
      service['mouseStartY'] = 200;
      service['scrollLeft'] = 300;
      service['scrollTop'] = 400;
      const event = new MouseEvent('mousemove', { clientX: 110, clientY: 220 });

      service.pan(event, container);

      expect(container.scrollLeft).toBe(300 - (110 - 100));
      expect(container.scrollTop).toBe(400 - (220 - 200));
    });
  });
});
