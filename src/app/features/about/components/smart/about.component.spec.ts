import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollAnimationService } from '@core/services/scroll-animation.service';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { vi } from 'vitest';
import '../../../../../../setup-vitest';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let scrollAnimationMock: any;
  let scrollSpyMock: any;

  beforeEach(async () => {
    scrollAnimationMock = {
      observe: vi.fn((config) => {
        if (config.onEnter) config.onEnter();
        if (config.onLeave) config.onLeave();
      }),
    };
    scrollSpyMock = { observeSection: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        { provide: ScrollAnimationService, useValue: scrollAnimationMock },
        { provide: ScrollSpyService, useValue: scrollSpyMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not observe if section is missing', () => {
    const spy = vi.spyOn(fixture.nativeElement, 'querySelector').mockReturnValue(null);
    scrollSpyMock.observeSection.mockClear();
    component.ngAfterViewInit();
    expect(scrollSpyMock.observeSection).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should observe section and elements on init', () => {
    expect(scrollSpyMock.observeSection).toHaveBeenCalled();
    expect(scrollAnimationMock.observe).toHaveBeenCalled();
  });
});
