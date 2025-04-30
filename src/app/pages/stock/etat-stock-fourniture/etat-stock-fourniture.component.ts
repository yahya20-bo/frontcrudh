import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etat-stock-fourniture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './etat-stock-fourniture.component.html',
  styleUrls: ['./etat-stock-fourniture.component.scss']
})
export class EtatStockFournitureComponent {
  tableHeaders = ['Référence', 'Désignation', 'Quantité Disponible'];

  tableData = [
    { reference: 'F001', designation: 'Fil', quantiteDisponible: 300 },
    { reference: 'F002', designation: 'Bouton', quantiteDisponible: 500 }
  ];
}
