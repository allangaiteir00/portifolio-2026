import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-section-title',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="section-title">
      @if (badge()) {
        <span class="section-title__badge">{{ badge() }}</span>
      }
      <h2 class="section-title__heading">
        {{ preText() }}<span class="gradient-text">{{ highlighted() }}</span>{{ postText() }}
      </h2>
      @if (subtitle()) {
        <p class="section-title__subtitle">{{ subtitle() }}</p>
      }
      <div class="section-title__line"></div>
    </div>
  `,
    styles: [`
    .section-title {
      text-align: center;
      margin-bottom: var(--space-9);

      &__badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--accent);
        background: var(--accent-glow);
        border: 1px solid var(--border-accent);
        border-radius: var(--radius-full);
        padding: var(--space-1) var(--space-4);
        margin-bottom: var(--space-4);

        &::before {
          content: '//';
          opacity: 0.5;
        }
      }

      &__heading {
        font-size: clamp(var(--text-3xl), 5vw, var(--text-5xl));
        font-weight: var(--weight-extrabold);
        color: var(--text-primary);
        margin-bottom: var(--space-4);
        line-height: var(--leading-tight);
      }

      &__subtitle {
        max-width: 560px;
        margin-inline: auto;
        color: var(--text-muted);
        font-size: var(--text-lg);
        line-height: var(--leading-relaxed);
        margin-bottom: var(--space-6);
      }

      &__line {
        width: 64px;
        height: 3px;
        background: var(--gradient-accent);
        border-radius: var(--radius-full);
        margin-inline: auto;
      }
    }
  `]
})
export class SectionTitleComponent {
    readonly badge = input<string>('');
    readonly preText = input<string>('');
    readonly highlighted = input<string>('');
    readonly postText = input<string>('');
    readonly subtitle = input<string>('');
}
