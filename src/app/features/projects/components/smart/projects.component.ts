import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';
import { TagChipComponent } from '@shared/components/tag-chip/tag-chip.component';
import { Project, ProjectCategory } from '../../models/project.model';
import { GithubService } from '../../services/github.service';

const PROJECTS: Project[] = [
  {
    id: 'insight-ai',
    title: 'Insight AI',
    description:
      'Plataforma SaaS de inteligência empresarial com dashboards dinâmicos, workspaces multi-tenant e agentes de IA.',
    longDescription:
      'Criado do zero com Angular 19+, Signals, arquitetura standalone e design system próprio. Suporta criação de widgets customizáveis, temas premium, filtros inteligentes e gerenciamento de entidades.',
    tags: ['Angular 19+', 'TypeScript', 'Signals', 'SaaS', 'Tailwind', 'Multi-tenant'],
    links: { github: 'https://github.com/AllanGaiteiro/insight-ai' },
    featured: true,
    category: 'saas',
  },
  {
    id: 'capital-empreendedor',
    title: 'Capital Empreendedor',
    description:
      'Plataforma fintech de crédito empresarial com integrações BNDES, WhatsApp API e Clicksign.',
    longDescription:
      'Integrações que aumentaram em 45% a geração de leads via Canal MPME/BNDES. Automação via WhatsApp chatbot e assinaturas digitais Clicksign. Adequação completa à LGPD.',
    tags: ['Angular', 'Node.js', 'BNDES', 'WhatsApp API', 'Clicksign', 'LGPD'],
    links: { live: 'https://painel.capitalempreendedor.com.br/entrar' },
    featured: true,
    category: 'fintech',
  },
  {
    id: 'grupo-mi7-saas',
    title: 'SaaS de Análise de Produto',
    description:
      'Ferramenta de análise de preços e visualizações interativas em mercado competitivo para o Grupo Mi7.',
    longDescription:
      'Páginas de análise de preços, gráficos interativos com biblioteca própria, API robusta em Django REST Framework e integração com prompts de IA em produção.',
    tags: ['Angular', 'Django', 'PostgreSQL', 'IA / LLMs', 'REST API', 'Chart.js'],
    links: {},
    featured: true,
    category: 'saas',
  },
];

const FILTERS: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'SaaS', value: 'saas' },
  { label: 'Fintech', value: 'fintech' },
  { label: 'GitHub API', value: 'github' },
];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, TagChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  private readonly scrollSpy = inject(ScrollSpyService);
  private readonly elementRef = inject(ElementRef);
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly githubService = inject(GithubService);

  protected readonly filters = FILTERS;
  protected readonly activeFilter = signal<ProjectCategory | 'all'>('all');

  protected readonly loadingGithub = this.githubService.loading;

  protected readonly allProjects = computed<Project[]>(() => {
    const ghModel = this.githubService.repositories().map((repo) => ({
      id: String(repo.id),
      title: repo.name,
      description: repo.description || 'Repositório público no GitHub.',
      longDescription: '',
      tags: [repo.language, ...(repo.topics || [])].filter(Boolean) as string[],
      links: { github: repo.html_url },
      featured: false,
      category: 'github' as ProjectCategory,
    }));
    return [...PROJECTS, ...ghModel];
  });

  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const projects = this.allProjects();
    return filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  });

  // Track animation state per card
  protected readonly visibleCards = signal<Set<string>>(new Set());

  constructor() {
    this.githubService.loadRepositories();

    // When filter changes, animate new cards in with a small stagger
    effect(() => {
      // read signal to subscribe
      const projects = this.filteredProjects();
      const newVisible = new Set<string>();

      this.ngZone.runOutsideAngular(() => {
        projects.forEach((project, index) => {
          setTimeout(() => {
            newVisible.add(project.id);
            this.ngZone.run(() => {
              this.visibleCards.set(new Set(newVisible));
              this.cdr.markForCheck();
            });
          }, index * 80);
        });
      });
    });
  }

  ngAfterViewInit(): void {
    const section = this.elementRef.nativeElement.querySelector('section');
    if (section) this.scrollSpy.observeSection(section, 'projects');
  }

  protected setFilter(value: ProjectCategory | 'all'): void {
    // Clear visible set first to trigger exit animation
    this.visibleCards.set(new Set());
    // Then after a tiny delay, set the filter (cards re-render and animate in)
    setTimeout(() => {
      this.activeFilter.set(value);
    }, 120);
  }

  protected isCardVisible(projectId: string): boolean {
    return this.visibleCards().has(projectId);
  }
}
