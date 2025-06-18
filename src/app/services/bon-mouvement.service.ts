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

  // ✅ Ajouter un mouvement (type = 'sorties/fourniture' ou 'entrees/fourniture')
create(type: string, data: BonMouvement): Observable<any> {
  return this.http.post(`${this.apiUrl}/${type}/create`, data);
}



  // ✅ Rechercher des mouvements (type = 'sorties/fourniture' ou 'entrees/fourniture')
  search(type: string, criteria: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/${type}/search`, criteria);
  }

  // ✅ Récupérer tous les mouvements par type
  getAll(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${type}`);
  }

  // ✅ Requête spécifique aux entrées tissu (pour conserver Excel/PDF)
  getEntreesTissu(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/entree-tissu`).pipe(
      map(res => res?.bonMouvements ?? [])
    );
  }

  // ✅ Exports : Entrée Tissu — Excel
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

  // ✅ Exports : Entrée Tissu — PDF
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
  // ✅ Ajouter une sortie tissu (utilisé dans ajout-sortie-tissu)
ajouterSortieTissu(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/sorties/tissu`, data);
}

// ✅ Rechercher des entrées tissu (utilisé dans entree-tissu.component.ts)
rechercherEntreesTissu(criteria: any): Observable<any> {
  return this.http.post<any[]>(`${this.apiUrl}/entree-tissu/recherche`, criteria);
}

// ✅ Récupérer toutes les sorties tissu (utilisé dans sortie-tissu.component.ts)
getSortiesTissu(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/sorties/tissu`);
}

// ✅ Rechercher des sorties tissu (utilisé dans sortie-tissu.component.ts)
// Corrigez l'URL pour qu'elle corresponde au backend
rechercherSortiesTissu(criteria: any): Observable<any> {
  return this.http.post<any[]>(`${this.apiUrl}/sorties/tissu/search`, criteria);
}

}
