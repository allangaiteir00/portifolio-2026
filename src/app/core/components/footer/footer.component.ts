import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <span class="footer__logo">AG.</span>
          <p class="footer__tagline">Criando soluções que inspiram.</p>
        </div>

        <div class="footer__links">
          <a href="https://linkedin.com/in/allan-gaiteiro" target="_blank" rel="noopener noreferrer" class="footer__link" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/AllanGaiteiro" target="_blank" rel="noopener noreferrer" class="footer__link" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="mailto:allansgaiteiro@gmail.com" class="footer__link" aria-label="E-mail">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>

        <p class="footer__copy">
          © 2026 Allan Gaiteiro · Feito com
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#6c63ff" style="display:inline;vertical-align:middle">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
          Angular 19
        </p>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      border-top: 1px solid var(--border);
      background: var(--bg-secondary);
      padding-block: var(--space-7);
      margin-top: var(--space-10);

      &__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-6);
        flex-wrap: wrap;

        @media (max-width: 640px) {
          flex-direction: column;
          text-align: center;
        }
      }

      &__brand {}

      &__logo {
        font-family: var(--font-mono);
        font-size: var(--text-xl);
        font-weight: var(--weight-bold);
        background: var(--gradient-accent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      &__tagline {
        font-size: var(--text-sm);
        color: var(--text-muted);
        margin-top: var(--space-1);
      }

      &__links {
        display: flex;
        gap: var(--space-4);
      }

      &__link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: var(--bg-glass);
        border: 1px solid var(--border);
        border-radius: var(--radius-full);
        color: var(--text-muted);
        text-decoration: none;
        transition: all var(--transition-base);

        &:hover {
          color: var(--accent);
          border-color: var(--border-accent);
          background: var(--accent-glow);
          transform: translateY(-2px);
        }
      }

      &__copy {
        font-size: var(--text-sm);
        color: var(--text-muted);
        display: flex;
        align-items: center;
        gap: var(--space-1);
      }
    }
  `]
})
export class FooterComponent { }
