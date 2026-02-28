import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';

const TYPING_PHRASES = [
  'Desenvolvedor Full Stack',
  'Angular Expert',
  'API Architect',
  'Clean Code Advocate',
  'Problem Solver',
];

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elRef = inject(ElementRef);

  protected readonly typedText = signal('');

  private currentPhraseIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;
  private scrollObserver: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.startTypingEffect();
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (this.scrollObserver) this.scrollObserver.disconnect();
  }

  private initScrollAnimations(): void {
    const elements: NodeListOf<Element> =
      this.elRef.nativeElement.querySelectorAll('.animate-on-scroll');

    if (!elements.length) return;

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    );

    elements.forEach((el: Element) => this.scrollObserver!.observe(el));
  }

  private startTypingEffect(): void {
    const currentPhrase = TYPING_PHRASES[this.currentPhraseIndex];
    const typeSpeed = this.isDeleting ? 55 : 105;
    const isFinished = !this.isDeleting && this.currentCharIndex === currentPhrase.length;
    const delay = isFinished ? 1800 : typeSpeed;

    this.typingTimer = setTimeout(() => {
      if (this.isDeleting) {
        this.currentCharIndex = Math.max(0, this.currentCharIndex - 1);
      } else {
        this.currentCharIndex = Math.min(currentPhrase.length, this.currentCharIndex + 1);
      }

      this.typedText.set(currentPhrase.slice(0, this.currentCharIndex));
      // Notify Angular's OnPush that something changed outside the zone
      this.cdr.markForCheck();

      if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % TYPING_PHRASES.length;
      }

      this.startTypingEffect();
    }, delay);
  }

  protected scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  protected openWhatsApp(): void {
    const message = 'Olá Allan! Vi o seu portfólio e gostaria de conversar.';
    window.open(`https://wa.me/55119999333358?text=${encodeURIComponent(message)}`, '_blank');
  }
}
