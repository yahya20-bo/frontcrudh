import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etat-stock-tissu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './etat-stock-tissu.component.html',
  styleUrls: ['./etat-stock-tissu.component.scss']
})
export class EtatStockTissuComponent {
  tableHeaders = ['Référence', 'Désignation', 'Couleur', 'Quantité Disponible'];

  tableData = [
    { reference: 'T001', designation: 'Coton', couleur: 'Bleu', quantiteDisponible: 120 },
    { reference: 'T002', designation: 'Soie', couleur: 'Rouge', quantiteDisponible: 45 }
  ];
}
