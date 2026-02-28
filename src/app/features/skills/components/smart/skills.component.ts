import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { ScrollAnimationService } from '@core/services/scroll-animation.service';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';
import { TagChipComponent } from '@shared/components/tag-chip/tag-chip.component';
import { SkillGroup } from '../../models/skill.model';

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'frontend',
    label: 'Frontend',
    icon: '🖥️',
    skills: [
      { name: 'Angular 19+', level: 95, category: 'frontend' },
      { name: 'TypeScript', level: 92, category: 'frontend' },
      { name: 'HTML / CSS', level: 90, category: 'frontend' },
      { name: 'Next.js', level: 82, category: 'frontend' },
      { name: 'React', level: 65, category: 'frontend' },
    ],
  },
  {
    category: 'backend',
    label: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js / NestJS', level: 88, category: 'backend' },
      { name: 'Django REST Framework', level: 85, category: 'backend' },
      { name: 'REST APIs', level: 95, category: 'backend' },
      { name: 'Python', level: 70, category: 'backend' },
      { name: 'PHP', level: 60, category: 'backend' },
    ],
  },
  {
    category: 'cloud',
    label: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      { name: 'AWS', level: 85, category: 'cloud' },
      { name: 'Firebase', level: 88, category: 'cloud' },
      { name: 'Docker', level: 85, category: 'cloud' },
      { name: 'GitHub Actions / CI-CD', level: 90, category: 'cloud' },
      { name: 'GCP', level: 75, category: 'cloud' },
    ],
  },
  {
    category: 'database',
    label: 'Databases',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', level: 88, category: 'database' },
      { name: 'MongoDB', level: 82, category: 'database' },
      { name: 'Firebase / Firestore', level: 85, category: 'database' },
    ],
  },
  {
    category: 'methodology',
    label: 'Práticas',
    icon: '📐',
    skills: [
      { name: 'SOLID / Clean Code', level: 92, category: 'methodology' },
      { name: 'Scrum / Kanban', level: 90, category: 'methodology' },
      { name: 'Jest / Cypress (TDD)', level: 85, category: 'methodology' },
      { name: 'Microserviços', level: 82, category: 'methodology' },
    ],
  },
];

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, TagChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements AfterViewInit {
  private readonly scrollAnimation = inject(ScrollAnimationService);
  private readonly scrollSpy = inject(ScrollSpyService);
  private readonly elementRef = inject(ElementRef);

  protected readonly skillGroups = SKILL_GROUPS;

  ngAfterViewInit(): void {
    const section = this.elementRef.nativeElement.querySelector('section');
    if (section) this.scrollSpy.observeSection(section, 'skills');

    const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    elements.forEach((el: Element) => {
      this.scrollAnimation.observe({
        element: el,
        onEnter: () => el.classList.add('is-visible'),
      });
    });

    const bars = this.elementRef.nativeElement.querySelectorAll('.skill-bar__fill');
    bars.forEach((bar: HTMLElement) => {
      this.scrollAnimation.observe({
        element: bar,
        onEnter: () => {
          bar.style.width = bar.dataset['level'] + '%';
        },
      });
    });
  }
}
