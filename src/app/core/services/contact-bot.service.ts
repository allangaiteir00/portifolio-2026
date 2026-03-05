import { computed, Injectable, signal } from '@angular/core';

export type ChatStep = 'welcome' | 'name' | 'email' | 'message' | 'redirect';

@Injectable({
    providedIn: 'root',
})
export class ContactBotService {
    readonly isOpen = signal(false);
    readonly currentStep = signal<ChatStep>('welcome');

    readonly userName = signal('');
    readonly userEmail = signal('');
    readonly userMessage = signal('');

    readonly isLastStep = computed(() => this.currentStep() === 'redirect');

    open() {
        this.isOpen.set(true);
        this.reset();
    }

    close() {
        this.isOpen.set(false);
    }

    nextStep() {
        const steps: ChatStep[] = ['welcome', 'name', 'email', 'message', 'redirect'];
        const currentIndex = steps.indexOf(this.currentStep());
        if (currentIndex < steps.length - 1) {
            this.currentStep.set(steps[currentIndex + 1]);
        }
    }

    reset() {
        this.currentStep.set('welcome');
        this.userName.set('');
        this.userEmail.set('');
        this.userMessage.set('');
    }

    getWhatsAppUrl(): string {
        const phone = '5519999333358';
        const text = encodeURIComponent(
            `Olá Allan! Me chamo ${this.userName()}.\n\n` +
            `E-mail: ${this.userEmail()}\n` +
            `Mensagem: ${this.userMessage()}\n\n` +
            `Vim pelo seu portfólio!`
        );

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

        if (isMobile) {
            return `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
        }

        return `https://web.whatsapp.com/send?phone=${phone}&text=${text}`;
    }
}
