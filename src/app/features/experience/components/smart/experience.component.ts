import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { ScrollAnimationService } from '@core/services/scroll-animation.service';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';
import { TagChipComponent } from '@shared/components/tag-chip/tag-chip.component';
import { Experience } from '../../models/experience.model';

const EXPERIENCES: Experience[] = [
    {
        id: 'grupo-mi7',
        company: 'Grupo Mi7',
        role: 'Desenvolvedor Pleno | Angular / Django',
        period: 'Mai 2025 – Presente',
        location: 'Remoto',
        type: 'fulltime',
        isCurrent: true,
        description: 'Desenvolvimento full stack em plataformas SaaS de análise de mercado, site institucional e ferramentas de exploração de clientes com IA.',
        achievements: [
            { text: 'Redesign completo do site institucional em Next.js com SEO e Google Tags', metric: '🚀' },
            { text: 'SaaS de análise de preços com visualizações interativas em Angular + Django REST', metric: '📊' },
            { text: 'Integração de prompts de IA em produção para análise inteligente', metric: '🤖' },
            { text: 'CI/CD com GitHub Actions, Docker e AWS; segurança CSRF/XSS/HTTPS', metric: '🔒' },
        ],
        tags: ['Angular', 'Django', 'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'IA'],
    },
    {
        id: 'freelance',
        company: 'Desenvolvedor Freelancer',
        role: 'Full Stack Developer',
        period: 'Nov 2024 – Presente',
        location: 'Remoto',
        type: 'freelance',
        isCurrent: true,
        description: 'Desenvolvimento de aplicações web, integração de APIs e automação de processos para clientes diversos.',
        achievements: [
            { text: 'Plataforma de análise de produtos (Angular + Django) do zero', metric: '⚡' },
            { text: 'APIs de autenticação e integração com sistemas legados', metric: '🔗' },
        ],
        tags: ['Angular', 'Node.js', 'PHP', 'Firebase', 'MongoDB', 'AWS'],
    },
    {
        id: 'vr-software',
        company: 'VR Software',
        role: 'Desenvolvedor Pleno | Angular / NestJS',
        period: 'Nov 2024 – Dez 2024',
        location: 'Remoto',
        type: 'fulltime',
        isCurrent: false,
        description: 'Desenvolvimento de telas e APIs para sistema de força de vendas no varejo.',
        achievements: [
            { text: 'Telas de cadastro e consulta de vendedores com gestão de regiões', metric: '🗺️' },
            { text: '100% de cobertura de testes unitários e E2E (Jest + Cypress)', metric: '✅' },
        ],
        tags: ['Angular', 'NestJS', 'Jest', 'Cypress', 'TypeScript'],
    },
    {
        id: 'capital-pleno',
        company: 'Capital Empreendedor',
        role: 'Desenvolvedor Pleno | Angular / Node.js',
        period: 'Nov 2022 – Out 2024 · 2 anos',
        location: 'Campinas, SP',
        type: 'fulltime',
        isCurrent: false,
        description: 'Desenvolvimento de integrações críticas para plataforma fintech de crédito empresarial.',
        achievements: [
            { text: 'Integração BNDES / Canal MPME com aumento de 45% na geração de leads', metric: '+45% leads' },
            { text: 'API WhatsApp + chatbot para alertas e automação de atendimento', metric: '💬' },
            { text: 'Integração Clicksign para assinaturas digitais — redução de jornada', metric: '✍️' },
            { text: 'Adequação completa à LGPD', metric: '🛡️' },
        ],
        tags: ['Angular', 'Node.js', 'WhatsApp API', 'Clicksign', 'BNDES', 'LGPD'],
    },
    {
        id: 'capital-junior',
        company: 'Capital Empreendedor',
        role: 'Desenvolvedor Júnior | Angular / Node.js',
        period: 'Jun 2021 – Nov 2022 · 1,5 anos',
        location: 'Campinas, SP',
        type: 'fulltime',
        isCurrent: false,
        description: 'Integrações, otimizações e reestruturações na plataforma fintech com versionamento autônomo.',
        achievements: [
            { text: 'Redução de tempo de relatórios de 40s para 3s (queries otimizadas)', metric: '-92% tempo' },
            { text: 'Reestruturação do backend: código mais limpo e escalável', metric: '♻️' },
            { text: '🏆 Melhor Funcionário do 3° Trimestre de 2021', metric: '🏆' },
        ],
        tags: ['Angular', 'Node.js', 'PostgreSQL', 'Clean Code'],
    },
];

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule, SectionTitleComponent, TagChipComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements AfterViewInit {
    private readonly scrollAnimation = inject(ScrollAnimationService);
    private readonly scrollSpy = inject(ScrollSpyService);
    private readonly elementRef = inject(ElementRef);

    protected readonly experiences = EXPERIENCES;

    ngAfterViewInit(): void {
        const section = this.elementRef.nativeElement.querySelector('section');
        if (section) this.scrollSpy.observeSection(section, 'experience');

        const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
        elements.forEach((el: Element) => {
            this.scrollAnimation.observe({
                element: el,
                onEnter: () => el.classList.add('is-visible'),
            });
        });
    }
}
