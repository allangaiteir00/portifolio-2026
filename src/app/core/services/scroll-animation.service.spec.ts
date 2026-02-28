import { TestBed } from '@angular/core/testing';
import '../../../../setup-vitest';
import { ScrollAnimationService, ScrollEntry } from './scroll-animation.service';

describe('ScrollAnimationService', () => {
  let service: ScrollAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call onEnter when entry is intersecting', () => {
    const mockElement = document.createElement('div');
    const onEnter = vi.fn();
    const entry: ScrollEntry = { element: mockElement, onEnter };

    service.observe(entry);

    const mockEntries = [
      {
        target: mockElement,
        isIntersecting: true,
      },
    ] as any[];

    (service as any).handleIntersection(mockEntries);
    expect(onEnter).toHaveBeenCalled();
  });

  it('should call onLeave when entry stops intersecting', () => {
    const mockElement = document.createElement('div');
    const onEnter = vi.fn();
    const onLeave = vi.fn();
    const entry: ScrollEntry = { element: mockElement, onEnter, onLeave };

    service.observe(entry);

    const mockEntries = [
      {
        target: mockElement,
        isIntersecting: false,
      },
    ] as any[];

    (service as any).handleIntersection(mockEntries);
    expect(onLeave).toHaveBeenCalled();
  });

  it('should remove element from map on unobserve', () => {
    const mockElement = document.createElement('div');
    const entry: ScrollEntry = { element: mockElement, onEnter: () => {} };

    service.observe(entry);
    expect((service as any).entryMap.has(mockElement)).toBe(true);

    service.unobserve(mockElement);
    expect((service as any).entryMap.has(mockElement)).toBe(false);
  });
});
