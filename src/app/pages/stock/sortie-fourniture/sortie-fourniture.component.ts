import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sortie-fourniture',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sortie-fourniture.component.html',
  styleUrls: ['./sortie-fourniture.component.scss']
})
export class SortieFournitureComponent {
  designation = '';
  quantite: number | null = null;
  dateSortie = '';

  refRecherche = '';
  designationRecherche = '';
  dateDebut = '';
  dateFin = '';

  tableData = [
    { reference: 'SF001', designation: 'Agrafeuse', quantite: 5, dateSortie: '2025-04-07' },
    { reference: 'SF002', designation: 'Cartouche', quantite: 3, dateSortie: '2025-04-09' }
  ];

  filteredData = [...this.tableData];

  addRow() {
    if (this.designation && this.quantite && this.dateSortie) {
      const newRow = {
        reference: 'SF' + (this.tableData.length + 1).toString().padStart(3, '0'),
        designation: this.designation,
        quantite: this.quantite,
        dateSortie: this.dateSortie
      };
      this.tableData.push(newRow);
      this.filteredData = [...this.tableData];
      this.designation = '';
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