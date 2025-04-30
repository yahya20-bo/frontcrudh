import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entree-tissu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entree-tissu.component.html',
  styleUrls: ['./entree-tissu.component.scss']
})
export class EntreeTissuComponent {
  designation = '';
  couleur = '';
  quantite: number | null = null;
  dateEntree = '';

  refRecherche = '';
  designationRecherche = '';
  dateDebut = '';
  dateFin = '';

  tableData = [
    { reference: 'T001', designation: 'Coton Bleu', couleur: 'Bleu', quantite: 120, dateEntree: '2025-04-01' },
    { reference: 'T002', designation: 'Linen Vert', couleur: 'Vert', quantite: 75, dateEntree: '2025-04-10' }
  ];

  filteredData = [...this.tableData];

  addRow() {
    if (this.designation && this.couleur && this.quantite && this.dateEntree) {
      const newRow = {
        reference: 'T' + (this.tableData.length + 1).toString().padStart(3, '0'),
        designation: this.designation,
        couleur: this.couleur,
        quantite: this.quantite,
        dateEntree: this.dateEntree
      };
      this.tableData.push(newRow);
      this.filteredData = [...this.tableData];
      this.designation = '';
      this.couleur = '';
      this.quantite = null;
      this.dateEntree = '';
    }
  }

  resetFilters() {
    this.refRecherche = '';
    this.designationRecherche = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.filteredData = [...this.tableData];
  }

  filter() {
    this.filteredData = this.tableData.filter(item => {
      const matchRef = this.refRecherche ? item.reference.toLowerCase().includes(this.refRecherche.toLowerCase()) : true;
      const matchDesignation = this.designationRecherche ? item.designation.toLowerCase().includes(this.designationRecherche.toLowerCase()) : true;
      const matchDateDebut = this.dateDebut ? item.dateEntree >= this.dateDebut : true;
      const matchDateFin = this.dateFin ? item.dateEntree <= this.dateFin : true;
      return matchRef && matchDesignation && matchDateDebut && matchDateFin;
    });
  }
}