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
  messages: { from: 'user' | 'bot', text: string }[] = [];

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

  constructor(private router: Router) {}

  envoyer(input?: string): void {
    const message = input ?? this.userInput.trim();
    if (!message) return;

    this.messages.push({ from: 'user', text: message });

    const cleaned = this.normalize(message);

    const route = this.matchIntent(cleaned);

    if (route) {
      this.messages.push({
        from: 'bot',
        text: `➡️ Redirection vers : ${route}`
      });
      this.router.navigate([route]);
    } else {
      this.messages.push({
        from: 'bot',
        text: `❌ Je n'ai pas compris. Essayez par exemple : ${this.suggestions.join(', ')}`
      });
    }

    this.userInput = '';
  }

  private matchIntent(cleaned: string): string | null {
    
    if ((cleaned.includes('ajouter') && cleaned.includes('entree ')) && cleaned.includes('article')) return '/ajout-entree-article';
    if ((cleaned.includes('ajouter') && cleaned.includes('entree ')) && cleaned.includes('fourniture')) return '/ajout-entree-fourniture';
    if ((cleaned.includes('ajouter') && cleaned.includes('entree ')) && cleaned.includes('divers')) return '/ajout-entree-divers';
    if ((cleaned.includes('ajouter') && cleaned.includes('sortie ')) && cleaned.includes('tissu')) return '/ajout-sortie-tissu';
    if ((cleaned.includes('ajouter') && cleaned.includes('entree ')) && cleaned.includes('tissu')) return '/ajout-entree-tissu';
    if ((cleaned.includes('ajouter') && cleaned.includes('sortie ')) && cleaned.includes('fourniture')) return '/ajout-sortie-fourniture';
    if ((cleaned.includes('ajouter') && cleaned.includes('sortie ')) && cleaned.includes('divers')) return '/ajout-sortie-divers';

    if ((cleaned.includes('ajouter') && cleaned.includes('sortie ')) && cleaned.includes('article')) return '/ajout-sortie-article';
    // Simplified word matching
    if (cleaned.includes('entree') && cleaned.includes('tissu')) return '/stock/entree-tissu';
    if (cleaned.includes('sortie') && cleaned.includes('tissu')) return '/stock/sortie-tissu';
    if ((cleaned.includes('etat') || cleaned.includes('stock')) && cleaned.includes('tissu')) return '/stock/etat-stock-tissu';

    if (cleaned.includes('entree') && cleaned.includes('fourniture')) return '/stock/entree-fourniture';
    if (cleaned.includes('sortie') && cleaned.includes('fourniture')) return '/stock/sortie-fourniture';
    if ((cleaned.includes('etat') || cleaned.includes('stock')) && cleaned.includes('fourniture')) return '/stock/etat-stock-fourniture';

    if (cleaned.includes('entree') && cleaned.includes('divers')) return '/stock/entree-divers';
    if (cleaned.includes('sortie') && cleaned.includes('divers')) return '/stock/sortie-divers';
    if ((cleaned.includes('etat') || cleaned.includes('stock')) && cleaned.includes('divers')) return '/stock/etat-stock-divers';

    if ((cleaned.includes('etat') || cleaned.includes('stock')) && cleaned.includes('article')) return '/stock/etat-stock-article';
    

    return null;
  }

  private normalize(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')                       // accents → lettres simples
      .replace(/[\u0300-\u036f]/g, '')       // remove accents
      .replace(/[^a-z0-9 ]/g, '')            // remove everything except letters/numbers/spaces
      .replace(/\s+/g, ' ')                  // replace multiple spaces
      .trim();                               // remove leading/trailing spaces
  }
}
