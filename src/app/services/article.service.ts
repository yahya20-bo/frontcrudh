import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
   * Récupère tous les articles (avec structure ArticleResult { articles: Article[] })
   */
  getAll(): Observable<ArticleResult> {
    return this.http.get<ArticleResult>(this.apiUrl);
  }

  /**
   * Récupère un article par ID
   */
  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  /**
   * Recherche d'articles selon des critères
   */
  search(criteria: any): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/search`, { params: criteria });
  }

  /**
   * Crée un nouvel article
   */
  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  /**
   * Met à jour un article existant
   */
  update(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  /**
   * Supprime un article
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Récupère la liste des fournisseurs (externe à l'article)
   */
  getFournisseurs(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/fournisseurs`);
  }


  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }
}
