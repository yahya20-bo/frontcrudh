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
  model = {
    reference: '',
    designation: '',
    quantite: null as number | null
  };

  sorties: { reference: string; designation: string; quantite: number }[] = [];
  successMessage = '';

  addSortie() {
    if (this.model.reference.trim() && this.model.designation.trim() && this.model.quantite && this.model.quantite > 0) {
      this.sorties.push({
        reference: this.model.reference,
        designation: this.model.designation,
        quantite: this.model.quantite
      });

      this.model = { reference: '', designation: '', quantite: null };
      this.successMessage = 'Sortie ajoutée avec succès ✅';

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }

  deleteSortie(index: number) {
    this.sorties.splice(index, 1);
  }
}
