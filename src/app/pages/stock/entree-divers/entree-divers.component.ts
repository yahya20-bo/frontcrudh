import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entree-divers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entree-divers.component.html',
  styleUrls: ['./entree-divers.component.scss']
})
export class EntreeDiversComponent {
  // Champs du formulaire d'ajout
  designation = '';
  quantite: number | null = null;
  dateEntree = '';

  // Champs de recherche
  refRecherche = '';
  designationRecherche = '';
  dateDebut = '';
  dateFin = '';

  // Données de base
  tableData = [
    { reference: 'E001', designation: 'Papier', quantite: 20, dateEntree: '2025-04-05' },
    { reference: 'E002', designation: 'Plastique', quantite: 10, dateEntree: '2025-04-08' }
  ];

  filteredData = [...this.tableData];

  addRow() {
    if (this.designation && this.quantite && this.dateEntree) {
      const newRow = {
        reference: 'E' + (this.tableData.length + 1).toString().padStart(3, '0'),
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