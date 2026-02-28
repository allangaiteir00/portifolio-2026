import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [class]="buttonClasses" [type]="type()" [disabled]="disabled()">
      @if (icon()) {
        <span class="btn__icon" [innerHTML]="icon()"></span>
      }
      <span class="btn__label"><ng-content /></span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        font-family: var(--font-sans);
        font-weight: var(--weight-semibold);
        border: none;
        cursor: pointer;
        transition: all var(--transition-spring);
        border-radius: var(--radius-full);
        text-decoration: none;
        white-space: nowrap;
        border: 1px solid transparent;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &.size-sm {
          padding: var(--space-2) var(--space-4);
          font-size: var(--text-sm);
        }

        &.size-md {
          padding: var(--space-3) var(--space-6);
          font-size: var(--text-base);
        }

        &.size-lg {
          padding: var(--space-4) var(--space-7);
          font-size: var(--text-lg);
        }

        &.variant-primary {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 0 0 0 var(--accent-glow);

          &:hover:not(:disabled) {
            background: var(--accent-light);
            box-shadow: var(--shadow-glow-sm);
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        }

        &.variant-ghost {
          background: var(--bg-glass);
          color: var(--text-primary);
          border-color: var(--border);
          backdrop-filter: blur(8px);

          &:hover:not(:disabled) {
            background: var(--bg-glass-hover);
            border-color: var(--border-hover);
            transform: translateY(-2px);
          }
        }

        &.variant-outline {
          background: transparent;
          color: var(--accent);
          border-color: var(--accent);

          &:hover:not(:disabled) {
            background: var(--accent-glow);
            transform: translateY(-2px);
          }
        }
      }
    `,
  ],
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly icon = input<string>('');

  get buttonClasses(): string {
    return `size-${this.size()} variant-${this.variant()}`;
  }
}
