import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EntiteStock } from '../models/entite-stock.model'; // ✅ C'est ce type que tu utilises
import { EntiteStockSearchResult } from '../models/entite-stock-result.model'; // ✅ Ce fichier doit exister

@Injectable({ providedIn: 'root' })
export class EntiteStockService {
  private apiUrl = 'http://localhost:8080/api/entite-stocks';

  constructor(private http: HttpClient) {}

  // ✅ Utilise le bon type ici :
  getAll(): Observable<EntiteStock[]> {
    return this.http.get<EntiteStockSearchResult>(this.apiUrl).pipe(
      map(response => response.entiteStocks || [])
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
