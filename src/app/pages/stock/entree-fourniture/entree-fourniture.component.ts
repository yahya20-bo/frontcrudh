import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entree-fourniture',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entree-fourniture.component.html',
  styleUrls: ['./entree-fourniture.component.scss']
})
export class EntreeFournitureComponent {
  designation = '';
  quantite: number | null = null;
  dateEntree = '';

  refRecherche = '';
  designationRecherche = '';
  dateDebut = '';
  dateFin = '';

  tableData = [
    { reference: 'F001', designation: 'Stylo', quantite: 50, dateEntree: '2025-04-01' },
    { reference: 'F002', designation: 'Classeur', quantite: 20, dateEntree: '2025-04-03' }
  ];

  filteredData = [...this.tableData];

  addRow() {
    if (this.designation && this.quantite && this.dateEntree) {
      const newRow = {
        reference: 'F' + (this.tableData.length + 1).toString().padStart(3, '0'),
        designation: this.designation,
        quantite: this.quantite,
        dateEntree: this.dateEntree
      };
      this.tableData.push(newRow);
      this.filteredData = [...this.tableData];
      this.designation = '';
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
