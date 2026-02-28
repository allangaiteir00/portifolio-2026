import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { ScrollAnimationService } from '@core/services/scroll-animation.service';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, SectionTitleComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
    private readonly scrollAnimation = inject(ScrollAnimationService);
    private readonly scrollSpy = inject(ScrollSpyService);
    private readonly elementRef = inject(ElementRef);

    protected readonly values = [
        { icon: '⚡', title: 'Velocidade', desc: 'Aprendi Angular do zero em 2 semanas e assumi projetos complexos do dia para a noite.' },
        { icon: '🎯', title: 'Impacto', desc: '+45% leads com BNDES, -90% no tempo de relatórios. Código que move métricas de negócio.' },
        { icon: '🏗️', title: 'Arquitetura', desc: 'SOLID, Clean Code e DDD não são buzzwords — são a base de tudo que construo.' },
        { icon: '🤝', title: 'Colaboração', desc: 'Referência técnica no time, mentor e entusiasta de compartilhar conhecimento.' },
    ];

    ngAfterViewInit(): void {
        const section = this.elementRef.nativeElement.querySelector('section');
        if (section) {
            this.scrollSpy.observeSection(section, 'about');
        }

        const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
        elements.forEach((el: Element) => {
            this.scrollAnimation.observe({
                element: el,
                onEnter: () => el.classList.add('is-visible'),
            });
        });
    }
}
