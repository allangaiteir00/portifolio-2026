import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tag-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="tag" [class]="'size-' + size()">{{ label() }}</span>`,
  styles: [
    `
      .tag {
        display: inline-flex;
        align-items: center;
        font-family: var(--font-mono);
        background: var(--bg-glass);
        border: 1px solid var(--border);
        color: var(--accent-light);
        border-radius: var(--radius-full);
        transition: all var(--transition-base);
        white-space: nowrap;

        &:hover {
          background: var(--accent-glow);
          border-color: var(--border-accent);
        }

        &.size-sm {
          padding: 2px 10px;
          font-size: var(--text-xs);
        }

        &.size-md {
          padding: 4px 14px;
          font-size: var(--text-sm);
        }
      }
    `,
  ],
})
export class TagChipComponent {
  readonly label = input.required<string>();
  readonly size = input<'sm' | 'md'>('md');
}
