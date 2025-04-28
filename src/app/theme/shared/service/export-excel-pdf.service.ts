import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelPdfService {
  constructor() {}

  exportExcel(data: any[], filename: string) {
    // TODO: Ajouter ici l'export Excel
    console.log('Export Excel', data, filename);
  }

  exportPdf(data: any[], filename: string) {
    // TODO: Ajouter ici l'export PDF
    console.log('Export PDF', data, filename);
  }
}
