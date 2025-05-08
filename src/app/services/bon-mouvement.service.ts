import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonMouvementService {
  private apiUrl = 'http://localhost:8080/api/bonmouvement';

  constructor(private http: HttpClient) {}

  // ✅ ENTREE TISSU
  getEntreesTissu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entree-tissu`);
  }

  rechercherEntreesTissu(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/entree-tissu/recherche`, criteria);
  }

  ajouterEntreeTissu(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/entree-tissu/create`, data);
  }

  // ✅ SORTIE TISSU
  getSortiesTissu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sortie-tissu`);
  }

  rechercherSortiesTissu(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/sortie-tissu/recherche`, criteria);
  }

  ajouterSortieTissu(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sortie-tissu/create`, data);
  }

  // ✅ MÉTHODES GÉNÉRIQUES
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
