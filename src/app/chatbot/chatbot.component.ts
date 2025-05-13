import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ChatbotComponent {
  userInput = '';
  messages: { from: 'user' | 'bot', text: string, action?: () => void }[] = [];

  suggestions = [
    'entrée tissu',
    'sortie tissu',
    'état stock tissu',
    'entrée fourniture',
    'sortie fourniture',
    'état stock fourniture',
    'entrée divers',
    'sortie divers',
    'état stock divers',
    'ajouter article'
  ];

  private routeMap = new Map<string, string>([
    ['entree tissu', '/stock/entree-tissu'],
    ['sortie tissu', '/stock/sortie-tissu'],
    ['etat stock tissu', '/stock/etat-stock-tissu'],

    ['entree fourniture', '/stock/entree-fourniture'],
    ['sortie fourniture', '/stock/sortie-fourniture'],
    ['etat stock fourniture', '/stock/etat-stock-fourniture'],

    ['entree divers', '/stock/entree-divers'],
    ['sortie divers', '/stock/sortie-divers'],
    ['etat stock divers', '/stock/etat-stock-divers'],

    ['ajouter article', '/stock/article'],
    ['article', '/stock/article']
  ]);

  constructor(private router: Router) {}

  envoyer(commande?: string): void {
    const message = commande ?? this.userInput.trim();
    if (!message) return;

    this.messages.push({ from: 'user', text: message });

    const normalized = this.normalize(message);
    const matchedPath = this.routeMap.get(normalized);

    if (matchedPath) {
      this.messages.push({
        from: 'bot',
        text: `➡️ Cliquez ici pour ouvrir : ${message}`,
        action: () => this.router.navigate([matchedPath])
      });
    } else {
      this.messages.push({
        from: 'bot',
        text: `❌ Commande non reconnue. Essayez parmi :\n${Array.from(this.routeMap.keys()).join(', ')}`
      });
    }

    this.userInput = '';
  }

  executerAction(message: { action?: () => void }) {
    if (message.action) message.action();
  }

  private normalize(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // accents
      .replace(/[^a-z0-9 ]/g, '')      // tout sauf lettres/chiffres/espaces
      .replace(/\s+/g, ' ')            // espaces multiples
      .trim();
  }
}
