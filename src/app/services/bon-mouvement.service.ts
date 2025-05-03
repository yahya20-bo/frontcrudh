import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonMouvementService {
  private apiUrl = `${environment.apiUrl}/bonmouvements`;

  constructor(private http: HttpClient) {}

  // Spécifique Tissu
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

  // Génériques (Divers, Fourniture, etc.)
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
