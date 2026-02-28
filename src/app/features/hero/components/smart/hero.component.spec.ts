import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import '../../../../../../setup-vitest';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update typedText over time', () => {
    if (component['typingTimer']) clearTimeout(component['typingTimer']);

    (component as any).currentCharIndex = 0;
    (component as any).isDeleting = false;
    (component as any).startTypingEffect();

    vi.advanceTimersByTime(110);
    expect((component as any).currentCharIndex).toBe(1);
    expect(component['typedText']().length).toBe(1);
  });

  it('should initialize scroll animations', () => {
    const dummy = document.createElement('div');
    dummy.classList.add('animate-on-scroll');
    fixture.nativeElement.appendChild(dummy);

    (component as any).initScrollAnimations();
    expect((component as any).scrollObserver).toBeTruthy();
  });

  it('should scroll to section', () => {
    const mockElement = { scrollIntoView: vi.fn() };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);

    component['scrollToSection']('about');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should call openWhatsApp', () => {
    const spy = vi.spyOn(window, 'open').mockImplementation(() => null as any);
    component['openWhatsApp']();
    expect(spy).toHaveBeenCalled();
  });

  it('should toggle isDeleting when phrase is complete', () => {
    if (component['typingTimer']) clearTimeout(component['typingTimer']);

    const realPhraseLength = 24; // 'Desenvolvedor Full Stack'.length
    (component as any).currentPhraseIndex = 0;
    (component as any).currentCharIndex = realPhraseLength;
    (component as any).isDeleting = false;

    (component as any).startTypingEffect();

    vi.advanceTimersByTime(1810);
    expect((component as any).isDeleting).toBe(true);
  });

  it('should handle deleting characters', () => {
    if (component['typingTimer']) clearTimeout(component['typingTimer']);

    (component as any).isDeleting = true;
    (component as any).currentCharIndex = 4;

    (component as any).startTypingEffect();
    vi.advanceTimersByTime(60); // deleteSpeed (55ms)

    expect((component as any).currentCharIndex).toBe(3);
  });

  it('should handle scroll intersection', () => {
    const entries = [
      {
        isIntersecting: true,
        target: { classList: { add: vi.fn() } },
      },
    ] as any;

    // @ts-ignore
    const instance = IntersectionObserver.lastInstance;
    instance.callback(entries);

    expect(entries[0].target.classList.add).toHaveBeenCalledWith('is-visible');
  });
});
