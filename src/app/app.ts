import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { SnakeGameComponent } from './features/about/components/smart/snake-game/snake-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SnakeGameComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-snake-game />
  `,
  styles: [
    `
      main {
        min-height: 100vh;
        padding-top: var(--header-height);
      }
    `,
  ],
})
export class App {}
