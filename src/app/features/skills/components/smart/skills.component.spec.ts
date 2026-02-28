import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollAnimationService } from '@core/services/scroll-animation.service';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { vi } from 'vitest';
import '../../../../../../setup-vitest';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
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
      imports: [SkillsComponent],
      providers: [
        { provide: ScrollAnimationService, useValue: scrollAnimationMock },
        { provide: ScrollSpyService, useValue: scrollSpyMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
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

  it('should observe skill bars', () => {
    const bars = fixture.nativeElement.querySelectorAll('.skill-bar__fill');
    expect(scrollAnimationMock.observe).toHaveBeenCalled();
    expect(scrollAnimationMock.observe.mock.calls.length).toBeGreaterThan(bars.length);
  });
});
