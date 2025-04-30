import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etat-stock-divers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './etat-stock-divers.component.html',
  styleUrls: ['./etat-stock-divers.component.scss']
})
export class EtatStockDiversComponent {
  tableHeaders = ['Référence', 'Désignation', 'Quantité Disponible'];

  tableData = [
    { reference: 'D001', designation: 'Accessoire', quantiteDisponible: 120 },
    { reference: 'D002', designation: 'Emballage', quantiteDisponible: 80 }
  ];
}
