import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly STORAGE_KEY = 'portfolio-theme';

    currentTheme = signal<Theme>(this.loadInitialTheme());

    toggleTheme(): void {
        const next: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
        this.currentTheme.set(next);
        this.applyTheme(next);
        localStorage.setItem(this.STORAGE_KEY, next);
    }

    private loadInitialTheme(): Theme {
        const saved = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
        const preferred: Theme = saved ?? 'dark';
        this.applyTheme(preferred);
        return preferred;
    }

    private applyTheme(theme: Theme): void {
        document.documentElement.setAttribute('data-theme', theme);
    }
}
