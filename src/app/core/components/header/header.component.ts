import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    OnInit,
    signal
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { ThemeService } from '@core/services/theme.service';

interface NavLink {
    id: string;
    label: string;
    anchor: string;
}

const NAV_LINKS: NavLink[] = [
    { id: 'hero', label: 'Início', anchor: '#hero' },
    { id: 'about', label: 'Sobre', anchor: '#about' },
    { id: 'skills', label: 'Skills', anchor: '#skills' },
    { id: 'experience', label: 'Experiência', anchor: '#experience' },
    { id: 'projects', label: 'Projetos', anchor: '#projects' },
    { id: 'contact', label: 'Contato', anchor: '#contact' },
];

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <div class="container header__inner">
        <!-- Logo -->
        <a href="#hero" class="header__logo" (click)="closeMobileMenu()">
          <span class="header__logo-text">AG</span>
          <span class="header__logo-dot"></span>
        </a>

        <!-- Desktop Nav -->
        <nav class="header__nav" aria-label="Navegação principal">
          @for (link of navLinks; track link.id) {
            <a
              [href]="link.anchor"
              class="header__nav-link"
              [class.active]="activeSection() === link.id"
              (click)="closeMobileMenu()"
            >{{ link.label }}</a>
          }
        </nav>

        <!-- Actions -->
        <div class="header__actions">
          <button
            class="header__theme-toggle"
            (click)="toggleTheme()"
            [attr.aria-label]="'Alternar para ' + (isDark() ? 'modo claro' : 'modo escuro')"
          >
            @if (isDark()) {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            } @else {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>

          <a
            href="https://linkedin.com/in/allan-gaiteiro"
            target="_blank"
            rel="noopener noreferrer"
            class="header__cta"
          >
            Contratar
          </a>

          <!-- Mobile hamburger -->
          <button
            class="header__hamburger"
            (click)="toggleMobileMenu()"
            [class.open]="isMobileMenuOpen()"
            aria-label="Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="header__mobile-menu" [class.open]="isMobileMenuOpen()">
        @for (link of navLinks; track link.id) {
          <a
            [href]="link.anchor"
            class="header__mobile-link"
            [class.active]="activeSection() === link.id"
            (click)="closeMobileMenu()"
          >{{ link.label }}</a>
        }
      </div>
    </header>
  `,
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    private readonly themeService = inject(ThemeService);
    private readonly scrollSpyService = inject(ScrollSpyService);

    protected readonly navLinks = NAV_LINKS;
    protected readonly activeSection = this.scrollSpyService.activeSection;
    protected readonly isDark = computed(() => this.themeService.currentTheme() === 'dark');
    protected readonly isMobileMenuOpen = signal(false);
    protected readonly isScrolled = signal(false);

    ngOnInit(): void {
        this.listenToScroll();
    }

    protected toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    protected toggleMobileMenu(): void {
        this.isMobileMenuOpen.update((open) => !open);
    }

    protected closeMobileMenu(): void {
        this.isMobileMenuOpen.set(false);
    }

    private listenToScroll(): void {
        window.addEventListener('scroll', () => {
            this.isScrolled.set(window.scrollY > 20);
        }, { passive: true });
    }
}
