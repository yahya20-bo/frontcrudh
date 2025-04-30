import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sortie-divers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sortie-divers.component.html',
  styleUrls: ['./sortie-divers.component.scss']
})
export class SortieDiversComponent {
  // Champs du formulaire d'ajout
  designation = '';
  quantite: number | null = null;
  dateSortie = '';

  // Champs de recherche
  refRecherche = '';
  designationRecherche = '';
  dateDebut = '';
  dateFin = '';

  // Données de base
  tableData = [
    { reference: 'S001', designation: 'Accessoire', quantite: 30, dateSortie: '2025-04-10' },
    { reference: 'S002', designation: 'Emballage', quantite: 15, dateSortie: '2025-04-12' }
  ];

  filteredData = [...this.tableData];

  addRow() {
    if (this.designation && this.quantite && this.dateSortie) {
      const newRow = {
        reference: 'S' + (this.tableData.length + 1).toString().padStart(3, '0'),
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
