import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article.model';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private apiUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {}

  // 🔍 Recherche d’articles par référence
  searchArticles(reference: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles?reference=${reference}`);
  }

  // 🤖 Envoyer un message texte au backend (optionnel si tu as un bot côté serveur)
  envoyerTexte(message: string): Observable<string> {
    return this.http.post(this.apiUrl, message, { responseType: 'text' });
  }
}
