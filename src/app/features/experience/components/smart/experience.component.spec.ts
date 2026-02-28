import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollAnimationService } from '@core/services/scroll-animation.service';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { vi } from 'vitest';
import '../../../../../../setup-vitest';
import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
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
      imports: [ExperienceComponent],
      providers: [
        { provide: ScrollAnimationService, useValue: scrollAnimationMock },
        { provide: ScrollSpyService, useValue: scrollSpyMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
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

  it('should render experiences list', () => {
    expect(component['experiences'].length).toBeGreaterThan(0);
  });
});
