import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollAnimationService } from '@core/services/scroll-animation.service';
import { ScrollSpyService } from '@core/services/scroll-spy.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SectionTitleComponent } from '@shared/components/section-title/section-title.component';

interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: string;
  readonly color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/allan-gaiteiro',
    icon: 'linkedin',
    color: '#0a66c2',
  },
  { label: 'GitHub', href: 'https://github.com/AllanGaiteiro', icon: 'github', color: '#333' },
  { label: 'E-mail', href: 'mailto:allansgaiteiro@gmail.com', icon: 'email', color: '#ea4335' },
  { label: 'WhatsApp', href: 'https://wa.me/5519999333358', icon: 'whatsapp', color: '#25d366' },
];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionTitleComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  private readonly fb = inject(FormBuilder);
  private readonly scrollAnimation = inject(ScrollAnimationService);
  private readonly scrollSpy = inject(ScrollSpyService);
  private readonly elementRef = inject(ElementRef);

  protected readonly socialLinks = SOCIAL_LINKS;
  protected readonly isSubmitted = signal(false);

  protected readonly contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  ngAfterViewInit(): void {
    const section = this.elementRef.nativeElement.querySelector('section');
    if (section) this.scrollSpy.observeSection(section, 'contact');

    const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    elements.forEach((el: Element) => {
      this.scrollAnimation.observe({
        element: el,
        onEnter: () => el.classList.add('is-visible'),
      });
    });
  }

  protected submitForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.contactForm.value as {
      name: string;
      email: string;
      message: string;
    };
    const subject = encodeURIComponent(`Contato via portfólio — ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);

    window.open(`mailto:allansgaiteiro@gmail.com?subject=${subject}&body=${body}`, '_blank');
    this.isSubmitted.set(true);
    this.contactForm.reset();
  }

  protected hasError(field: string, error: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control?.hasError(error) && control.touched);
  }
}
