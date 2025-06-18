import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticleResult } from '../models/ArticleResult';
import { environment } from '../../environments/environment';
import { FournisseurValue } from '../models/fournisseur.model';
import { ClientValue } from '../models/client.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
  return this.http.get<ArticleResult>(this.apiUrl).pipe(
    map(response => response.articles) // 🧠 nécessite: import { map } from 'rxjs/operators';
  );
}


  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  search(criteria: any): Observable<ArticleResult> {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get<ArticleResult>(`${this.apiUrl}/search`, { params });
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  update(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFournisseurs(): Observable<FournisseurValue[]> {
    return this.http.get<FournisseurValue[]>('http://localhost:8080/api/fournisseurs');
  }

  getClients(): Observable<ClientValue[]> {
    return this.http.get<ClientValue[]>('http://localhost:8080/api/clients');
  }

  getRaisonsEntree(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/raisons-entree`);
  }

  getArticles(): Observable<Article[]> {
    return this.getAll();
  }

  getMagasins(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/magasins');
  }
}
