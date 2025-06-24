import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Magasin, MagasinResponse } from '../models/magasin.model';

@Injectable({ providedIn: 'root' })
export class MagasinService {
  private apiUrl = 'http://localhost:8080/api/magasins';

  constructor(private http: HttpClient) {}

  // ✅ Correction ici : on attend une réponse structurée
  getAll(): Observable<MagasinResponse> {
    return this.http.get<MagasinResponse>(this.apiUrl);
  }

  getById(id: number): Observable<Magasin> {
    return this.http.get<Magasin>(`${this.apiUrl}/${id}`);
  }

  create(data: Magasin): Observable<Magasin> {
    return this.http.post<Magasin>(this.apiUrl, data);
  }

  update(id: number, data: Magasin): Observable<Magasin> {
    return this.http.put<Magasin>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
