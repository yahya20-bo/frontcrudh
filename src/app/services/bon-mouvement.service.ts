import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BonMouvement } from '../models/bon-mouvement.model';

@Injectable({
  providedIn: 'root'
})
export class BonMouvementService {
  private apiUrl = 'http://localhost:8080/api/bonmouvement';

  constructor(private http: HttpClient) {}

  // ✅ Ajouter un mouvement (tous types : ex. 'entrees/article', 'sorties/fourniture')
  create(type: string, data: BonMouvement): Observable<any> {
    return this.http.post(`${this.apiUrl}/${type}/create`, data);
  }

  // ✅ Rechercher des mouvements (tous types)
  search(type: string, criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/${type}/search`, criteria);
  }

  // ✅ Récupérer tous les mouvements par type
  getAll(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${type}`);
  }
    getById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }


  // ✅ Entrée Tissu spécifique : GET (pour affichage)
  getEntreesTissu(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/entree-tissu`).pipe(
      map(res => res?.bonMouvements ?? [])
    );
  }

  // ✅ Sortie Tissu spécifique : GET
  getSortiesTissu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sorties/tissu`);
  }

  // ✅ Rechercher les entrées tissu
  rechercherEntreesTissu(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/entree-tissu/recherche`, criteria);
  }
  rechercherEntreesFourniture(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/entrees/fourniture/search`, criteria);
    }
    rechercherSortiesForniture(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/sorties/fourniture/search`, criteria);
  }
  // ✅ Rechercher les sorties tissu
  rechercherSortiesTissu(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/sorties/tissu/search`, criteria);
  }
  rechercherEntreesDivers(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/entrees/divers/search`, criteria);
  }
  rechercherSortiesDivers(criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/sorties/divers/search`, criteria);
  }

  // ✅ Ajouter une sortie tissu (ex. depuis 'ajout-sortie-tissu')
  ajouterSortieTissu(data: BonMouvement): Observable<any> {
    return this.http.post(`${this.apiUrl}/sorties/tissu/create`, data);
  }

  // ✅ Exports Excel / PDF pour Entrée Tissu
  exporterEntreeTissuExcel(resultats: any[]): void {
    this.http.post(`${this.apiUrl}/entree-tissu/export/excel`, resultats, {
      responseType: 'blob'
    }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rapport_entree_tissu.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  exporterEntreeTissuPDF(resultats: any[]): void {
    this.http.post(`${this.apiUrl}/entree-tissu/export/pdf`, resultats, {
      responseType: 'blob'
    }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rapport_entree_tissu.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  // ✅ Entrée Article : pour affichage table
  getEntreesArticle(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/entrees/article`).pipe(
      map(res => res?.bonMouvements ?? res ?? [])
    );
  }

  // ✅ Entrée Fourniture : pour affichage table
  getEntreesFourniture(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/entrees/fourniture`);
  }

  // ✅ Sortie Fourniture : pour affichage table
  getSortiesFourniture(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/sorties/fourniture`);
  }

  // ✅ Divers
  getEntreesDivers(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/entrees/divers`);
  }

  getSortiesDivers(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/sorties/divers`);
  }
}
