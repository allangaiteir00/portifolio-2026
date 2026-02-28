import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { ThemeService } from '@core/services/theme.service';
import 'zone.js/testing';
import '../../../../../setup-vitest';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let themeServiceMock: any;
  let scrollSpyServiceMock: any;

  beforeEach(async () => {
    themeServiceMock = {
      currentTheme: signal('dark'),
      toggleTheme: vi.fn(),
    };

    scrollSpyServiceMock = {
      activeSection: signal('hero'),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: ScrollSpyService, useValue: scrollSpyServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme when button clicked', () => {
    const button = fixture.nativeElement.querySelector('.header__theme-toggle');
    button.click();
    expect(themeServiceMock.toggleTheme).toHaveBeenCalled();
  });

  it('should highlight active section link', () => {
    scrollSpyServiceMock.activeSection.set('about');
    fixture.detectChanges();
    const activeLink = fixture.nativeElement.querySelector('.header__nav-link.active');
    expect(activeLink.textContent).toContain('Sobre');
  });

  it('should toggle mobile menu', () => {
    const hamburger = fixture.nativeElement.querySelector('.header__hamburger');
    hamburger.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.header__mobile-menu.open')).toBeTruthy();

    hamburger.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.header__mobile-menu.open')).toBeFalsy();
  });

  it('should close mobile menu', () => {
    component['isMobileMenuOpen'].set(true);
    component['closeMobileMenu']();
    expect(component['isMobileMenuOpen']()).toBe(false);
  });

  it('should call openWhatsApp when CTA clicked', () => {
    const spy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const cta = fixture.nativeElement.querySelector('.header__cta');
    cta.click();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('wa.me'), '_blank');
    spy.mockRestore();
  });

  it('should update isScrolled on window scroll', async () => {
    (window as any).scrollY = 50;
    window.dispatchEvent(new Event('scroll'));
    await new Promise((resolve) => setTimeout(resolve, 10));
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('.header');
    expect(header.classList.contains('scrolled')).toBe(true);
  });
});
