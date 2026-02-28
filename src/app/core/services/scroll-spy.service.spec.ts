import { TestBed } from '@angular/core/testing';
import '../../../../setup-vitest';
import { ScrollSpyService } from './scroll-spy.service';

describe('ScrollSpyService', () => {
  let service: ScrollSpyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollSpyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should observe a section when register', () => {
    const spy = vi.spyOn((service as any).observer, 'observe');
    const element = document.createElement('div');
    service.observeSection(element, 'test');
    expect(spy).toHaveBeenCalledWith(element);
    expect((service as any).sectionMap.get(element)).toBe('test');
  });

  it('should initialize with hero section active', () => {
    expect(service.activeSection()).toBe('hero');
  });

  it('should update active section when intersect occurs', () => {
    const mockElement = document.createElement('div');
    service.observeSection(mockElement, 'about');

    const entries = [
      {
        isIntersecting: true,
        target: mockElement,
        intersectionRatio: 1,
      },
    ] as any[];

    // @ts-ignore
    const instance = IntersectionObserver.lastInstance;
    instance.callback(entries);

    expect(service.activeSection()).toBe('about');
  });

  it('should sort entries by intersectionRatio and pick the best one', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    service.observeSection(el1, 'section1');
    service.observeSection(el2, 'section2');

    const entries = [
      { isIntersecting: true, target: el1, intersectionRatio: 0.5 },
      { isIntersecting: true, target: el2, intersectionRatio: 0.9 },
    ] as any[];

    // @ts-ignore
    const instance = IntersectionObserver.lastInstance;
    instance.callback(entries);

    expect(service.activeSection()).toBe('section2');
  });
});
