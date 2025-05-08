import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class ExportService {
  exportToExcel(data: any[], fileName: string): void {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    FileSaver.saveAs(new Blob([buffer]), `${fileName}.xlsx`);
  }

  exportToPDF(headers: string[], data: any[], fileName: string): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [headers],
      body: data.map(row => headers.map(col => row[col] ?? '')),
    });
    doc.save(`${fileName}.pdf`);
  }
}
