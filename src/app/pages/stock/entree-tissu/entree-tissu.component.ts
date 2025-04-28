import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entree-tissu',
  standalone: true,
  templateUrl: './entree-tissu.component.html',
  styleUrls: ['./entree-tissu.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule
  ]
})
export class EntreeTissuComponent {
  entreeForm: FormGroup;
  tissus: any[] = [];
  tissusFiltre: any[] = [];
  searchText: string = '';

  colonnes = [
    { prop: 'nom', name: 'Nom du Tissu' },
    { prop: 'quantite', name: 'Quantité' },
    { prop: 'couleur', name: 'Couleur' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.entreeForm = this.fb.group({
      nom: [''],
      quantite: [''],
      couleur: ['']
    });
  }

  ajouter() {
    if (this.entreeForm.valid) {
      const nouveauTissu = this.entreeForm.value;
      this.tissus.push(nouveauTissu);
      this.tissusFiltre = [...this.tissus];
      this.entreeForm.reset();
    }
  }

  rechercher() {
    const texte = this.searchText.toLowerCase();
    this.tissusFiltre = this.tissus.filter(tissu =>
      tissu.nom.toLowerCase().includes(texte) ||
      tissu.couleur.toLowerCase().includes(texte)
    );
  }

  retour() {
    this.router.navigate(['/stock']);
  }
}
