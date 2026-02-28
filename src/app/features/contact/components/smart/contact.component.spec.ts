import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollAnimationService } from '@core/services/scroll-animation.service';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { vi } from 'vitest';
import '../../../../../../setup-vitest';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
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
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [
        { provide: ScrollAnimationService, useValue: scrollAnimationMock },
        { provide: ScrollSpyService, useValue: scrollSpyMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component['contactForm'].valid).toBe(false);
  });

  it('should validate email format', () => {
    const email = component['contactForm'].get('email');
    email?.setValue('invalid-email');
    expect(email?.hasError('email')).toBe(true);
  });

  it('should call window.open on submit if valid', () => {
    const openSpy = vi.fn();
    vi.stubGlobal('open', openSpy);

    component['contactForm'].patchValue({
      name: 'Test user',
      email: 'test@example.com',
      message: 'This is a very long message for testing 20 chars.',
    });

    component['submitForm']();

    expect(openSpy).toHaveBeenCalled();
    expect(component['isSubmitted']()).toBe(true);
    vi.unstubAllGlobals();
  });

  it('should mark all as touched on invalid submit', () => {
    const spy = vi.spyOn(component['contactForm'], 'markAllAsTouched');
    component['submitForm']();
    expect(spy).toHaveBeenCalled();
    expect(component['isSubmitted']()).toBe(false);
  });
});
