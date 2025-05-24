import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BonMouvementService {

  private apiUrl = 'http://localhost:8080/api/bonmouvement';

  constructor(private http: HttpClient) {}

  // ✅ ENTREE TISSU
 getEntreesTissu(): Observable<any[]> {
  return this.http.get<any>(`${this.apiUrl}/entree-tissu`).pipe(
    map(res => res?.bonMouvements ?? [])
  );
}

  rechercherEntreesTissu(criteria: any): Observable<any[]> {
  return this.http.post<any>(`${this.apiUrl}/entree-tissu/recherche`, criteria).pipe(
    map(res => res?.bonMouvements ?? [])
  );
}


  ajouterEntreeTissu(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/entrees/tissu`, data);
  }

  // ✅ SORTIE TISSU
  getSortiesTissu(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/sorties/tissu`).pipe(
      map(res => res?.bonMouvements ?? [])
    );
  }

  rechercherSortiesTissu(criteria: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/sorties/tissu/search`, criteria).pipe(
      map(res => res?.bonMouvements ?? [])
    );
  }

  ajouterSortieTissu(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sorties/tissu`, data);
  }

  // ✅ MÉTHODES GÉNÉRIQUES
  getAll(type: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${type}`).pipe(
      map(res => Array.isArray(res) ? res : res?.[type] ?? [])
    );
  }

  search(type: string, criteria: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/${type}/search`, criteria).pipe(
      map(res => Array.isArray(res) ? res : res?.[type] ?? [])
    );
  }

  create(type: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${type}`, data);
  }
}
