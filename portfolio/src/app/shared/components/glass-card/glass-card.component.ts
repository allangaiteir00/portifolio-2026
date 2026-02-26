import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-glass-card',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="glass-card" [class.hoverable]="hoverable()">
      <ng-content />
    </div>
  `,
    styles: [`
    .glass-card {
      background: var(--bg-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-card);
      position: relative;
      overflow: hidden;
      transition: all var(--transition-base);

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--gradient-card);
        pointer-events: none;
      }

      &.hoverable {
        cursor: pointer;

        &:hover {
          border-color: var(--border-accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg), 0 0 32px var(--accent-glow);
        }
      }
    }
  `]
})
export class GlassCardComponent {
    readonly hoverable = input<boolean>(true);
}
