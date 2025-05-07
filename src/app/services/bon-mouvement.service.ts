import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonMouvementService {
  private apiUrl = 'http://localhost:8080/api/bonmouvements';


  constructor(private http: HttpClient) {}

  // 🎯 Méthodes spécifiques à TISSU
  getEntreesTissu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entrees/tissu`);
  }

  rechercherEntreesTissu(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/entrees/tissu/search`, criteria);
  }

  ajouterEntreeTissu(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/entrees/tissu`, data);
  }

  getSortiesTissu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sorties/tissu`);
  }

  rechercherSortiesTissu(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/sorties/tissu/search`, criteria);
  }

  ajouterSortieTissu(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sorties/tissu`, data);
  }

  // ✅ Méthodes GÉNÉRIQUES (si besoin de réutiliser dans d’autres modules)
  getAll(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${type}`);
  }

  search(type: string, criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/${type}/search`, criteria);
  }

  create(type: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${type}`, data);
  }
}
