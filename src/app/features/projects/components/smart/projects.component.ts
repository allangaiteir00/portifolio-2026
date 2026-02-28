import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, computed, effect, inject, signal } from '@angular/core';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';
import { TagChipComponent } from '@shared/components/tag-chip/tag-chip.component';
import { Project, ProjectCategory } from '../../models/project.model';

const PROJECTS: Project[] = [
    {
        id: 'insight-ai',
        title: 'Insight AI',
        description: 'Plataforma SaaS de inteligência empresarial com dashboards dinâmicos, workspaces multi-tenant e agentes de IA.',
        longDescription: 'Criado do zero com Angular 19+, Signals, arquitetura standalone e design system próprio. Suporta criação de widgets customizáveis, temas premium, filtros inteligentes e gerenciamento de entidades.',
        tags: ['Angular 19+', 'TypeScript', 'Signals', 'SaaS', 'Tailwind', 'Multi-tenant'],
        links: { github: 'https://github.com/AllanGaiteiro/insight-ai' },
        featured: true,
        category: 'saas',
    },
    {
        id: 'capital-empreendedor',
        title: 'Capital Empreendedor',
        description: 'Plataforma fintech de crédito empresarial com integrações BNDES, WhatsApp API e Clicksign.',
        longDescription: 'Integrações que aumentaram em 45% a geração de leads via Canal MPME/BNDES. Automação via WhatsApp chatbot e assinaturas digitais Clicksign. Adequação completa à LGPD.',
        tags: ['Angular', 'Node.js', 'BNDES', 'WhatsApp API', 'Clicksign', 'LGPD'],
        links: { live: 'https://painel.capitalempreendedor.com.br/entrar' },
        featured: true,
        category: 'fintech',
    },
    {
        id: 'grupo-mi7-saas',
        title: 'SaaS de Análise de Produto',
        description: 'Ferramenta de análise de preços e visualizações interativas em mercado competitivo para o Grupo Mi7.',
        longDescription: 'Páginas de análise de preços, gráficos interativos com biblioteca própria, API robusta em Django REST Framework e integração com prompts de IA em produção.',
        tags: ['Angular', 'Django', 'PostgreSQL', 'IA / LLMs', 'REST API', 'Chart.js'],
        links: {},
        featured: true,
        category: 'saas',
    },
    {
        id: 'portfolio',
        title: 'Portfólio 2026',
        description: 'Este portfólio — construído com Angular 19+, design system próprio, animações e scroll-reveal.',
        longDescription: 'Single-page application com 6 seções, glassmorphism, typing effect, skill bars animadas e totalmente responsivo.',
        tags: ['Angular 19+', 'TypeScript', 'SCSS', 'IntersectionObserver'],
        links: { github: 'https://github.com/AllanGaiteiro' },
        featured: false,
        category: 'portfolio',
    },
];

const FILTERS: { label: string; value: ProjectCategory | 'all' }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'SaaS', value: 'saas' },
    { label: 'Fintech', value: 'fintech' },
    { label: 'Portfólio', value: 'portfolio' },
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

    protected readonly filters = FILTERS;
    protected readonly activeFilter = signal<ProjectCategory | 'all'>('all');

    protected readonly filteredProjects = computed(() => {
        const filter = this.activeFilter();
        return filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
    });

    // Track animation state per card
    protected readonly visibleCards = signal<Set<string>>(new Set());

    constructor() {
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
