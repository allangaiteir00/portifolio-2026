import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { ThemeService } from '@core/services/theme.service';
import '../../setup-vitest';
import { App } from './app';

describe('App', () => {
  const mockThemeService = {
    currentTheme: signal('dark'),
    toggleTheme: () => {},
  };

  const mockScrollSpyService = {
    activeSection: signal('hero'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: ThemeService, useValue: mockThemeService },
        { provide: ScrollSpyService, useValue: mockScrollSpyService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
