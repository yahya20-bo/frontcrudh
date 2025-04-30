import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sortie-tissu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sortie-tissu.component.html',
  styleUrls: ['./sortie-tissu.component.scss']
})
export class SortieTissuComponent {
  designation = '';
  couleur = '';
  quantite: number | null = null;
  dateSortie = '';

  refRecherche = '';
  designationRecherche = '';
  dateDebut = '';
  dateFin = '';

  tableData = [
    { reference: 'TS001', designation: 'Soie Noire', couleur: 'Noir', quantite: 50, dateSortie: '2025-04-15' },
    { reference: 'TS002', designation: 'Lin Beige', couleur: 'Beige', quantite: 60, dateSortie: '2025-04-20' }
  ];

  filteredData = [...this.tableData];

  addRow() {
    if (this.designation && this.couleur && this.quantite && this.dateSortie) {
      const newRow = {
        reference: 'TS' + (this.tableData.length + 1).toString().padStart(3, '0'),
        designation: this.designation,
        couleur: this.couleur,
        quantite: this.quantite,
        dateSortie: this.dateSortie
      };
      this.tableData.push(newRow);
      this.filteredData = [...this.tableData];
      this.designation = '';
      this.couleur = '';
      this.quantite = null;
      this.dateSortie = '';
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
      const matchDateDebut = this.dateDebut ? item.dateSortie >= this.dateDebut : true;
      const matchDateFin = this.dateFin ? item.dateSortie <= this.dateFin : true;
      return matchRef && matchDesignation && matchDateDebut && matchDateFin;
    });
  }
}
