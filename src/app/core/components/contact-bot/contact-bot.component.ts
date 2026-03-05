import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactBotService } from '../../services/contact-bot.service';

@Component({
  selector: 'app-contact-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="bot-fab"
      (click)="botService.open()"
      aria-label="Abrir Chat de Contato"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
      </svg>
    </button>

    @if (botService.isOpen()) {
      <div class="bot-overlay" (click)="botService.close()">
        <div class="bot-modal" (click)="$event.stopPropagation()">
          <!-- Header -->
          <div class="bot-header">
            <div class="bot-profile">
              <div class="bot-avatar">AG</div>
              <div class="bot-info">
                <span class="bot-name">Allan Bot</span>
                <span class="bot-status">online</span>
              </div>
            </div>
            <button class="bot-close" (click)="botService.close()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Chat History -->
          <div class="bot-body">
            <div class="message incoming">
              <div class="message-bubble">
                Olá! 👋 Sou o assistente do Allan. Como posso te chamar?
              </div>
            </div>

            @if (botService.userName()) {
              <div class="message outgoing">
                <div class="message-bubble">{{ botService.userName() }}</div>
              </div>
              <div class="message incoming">
                <div class="message-bubble">
                  Prazer em te conhecer, {{ botService.userName() }}! Qual o seu melhor e-mail?
                </div>
              </div>
            }

            @if (botService.userEmail()) {
              <div class="message outgoing">
                <div class="message-bubble">{{ botService.userEmail() }}</div>
              </div>
              <div class="message incoming">
                <div class="message-bubble">
                  Ótimo! Agora, me conte um pouco sobre o que você precisa ou a oportunidade que tem em mente.
                </div>
              </div>
            }

            @if (botService.userMessage()) {
              <div class="message outgoing">
                <div class="message-bubble">{{ botService.userMessage() }}</div>
              </div>
              <div class="message incoming">
                <div class="message-bubble">
                  Entendido! Clique no botão abaixo para finalizarmos a conversa no WhatsApp do Allan.
                </div>
              </div>
            }
          </div>

          <!-- Input Area -->
          <div class="bot-footer">
            @if (botService.currentStep() === 'welcome') {
              <button class="bot-btn-start" (click)="botService.nextStep()">Começar conversa</button>
            } @else if (botService.currentStep() === 'name') {
              <div class="input-group">
                <input #nameInput type="text" placeholder="Seu nome..." 
                       (keyup.enter)="botService.userName.set(nameInput.value); botService.nextStep()" autofocus>
                <button (click)="botService.userName.set(nameInput.value); botService.nextStep()">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            } @else if (botService.currentStep() === 'email') {
              <div class="input-group">
                <input #emailInput type="email" placeholder="seu@email.com" 
                       (keyup.enter)="botService.userEmail.set(emailInput.value); botService.nextStep()" autofocus>
                <button (click)="botService.userEmail.set(emailInput.value); botService.nextStep()">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            } @else if (botService.currentStep() === 'message') {
              <div class="input-group">
                <textarea #msgInput placeholder="Fale sobre o projeto ou vaga..." 
                          (keyup.enter)="botService.userMessage.set(msgInput.value); botService.nextStep()" autofocus></textarea>
                <button (click)="botService.userMessage.set(msgInput.value); botService.nextStep()">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            } @else if (botService.currentStep() === 'redirect') {
              <a [href]="botService.getWhatsAppUrl()" target="_blank" class="bot-btn-wa" (click)="botService.close()">
                Abrir WhatsApp
              </a>
            }
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./contact-bot.component.scss'],
})
export class ContactBotComponent {
  protected readonly botService = inject(ContactBotService);
}
