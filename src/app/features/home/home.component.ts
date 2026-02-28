import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from '@features/about/components/smart/about.component';
import { ContactComponent } from '@features/contact/components/smart/contact.component';
import { ExperienceComponent } from '@features/experience/components/smart/experience.component';
import { HeroComponent } from '@features/hero/components/smart/hero.component';
import { ProjectsComponent } from '@features/projects/components/smart/projects.component';
import { SkillsComponent } from '@features/skills/components/smart/skills.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-skills />
    <app-experience />
    <app-projects />
    <app-contact />
  `,
})
export class HomeComponent {}
