import { TestBed } from '@angular/core/testing';
import '../../../../setup-vitest';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial theme as dark by default', () => {
    expect(service.currentTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should load saved theme from localStorage', () => {
    localStorage.setItem('portfolio-theme', 'light');
    // Reset service to trigger loadInitialTheme again
    const newService = TestBed.runInInjectionContext(() => new ThemeService());
    expect(newService.currentTheme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should toggle theme', () => {
    // Starts at dark (default)
    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');
  });

  it('should load theme from localStorage on init', () => {
    localStorage.setItem('portfolio-theme', 'light');
    const newService = TestBed.runInInjectionContext(() => new ThemeService());
    expect(newService.currentTheme()).toBe('light');
  });

  it('should toggle theme from dark to light', () => {
    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    service.currentTheme.set('light');
    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
