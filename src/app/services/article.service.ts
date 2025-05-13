import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticleResult } from '../models/ArticleResult';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les articles (liste plate)
   */
  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  /**
   * Récupère un article par ID
   */
  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  /**
   * Recherche d'articles avec des critères dynamiques
   */
  search(criteria: any): Observable<ArticleResult> {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get<ArticleResult>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Création d’un nouvel article
   */
  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  /**
   * Mise à jour d’un article
   */
  update(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  /**
   * Suppression d’un article
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Fournisseurs disponibles
   */
  getFournisseurs(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/fournisseurs`);
  }

  /**
   * Clients disponibles
   */
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/clients`);
  }

  /**
   * Raisons d’entrée disponibles
   */
  getRaisonsEntree(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/raisons-entree`);
  }
}
