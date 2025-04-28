import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    NgxDatatableModule
  ]
})
export class EntreeTissuComponent {
  formulaire: FormGroup;
  liste: any[] = [];
  listeFiltre: any[] = [];
  searchText = '';

  colonnes = [
    { prop: 'nom', name: 'Nom' },
    { prop: 'quantite', name: 'Quantité' },
    { prop: 'tiers', name: 'Fournisseur/Client' },
    { prop: 'date', name: 'Date' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulaire = this.fb.group({
      nom: [''],
      quantite: [''],
      tiers: [''],
      date: ['']
    });
  }

  ajouter() {
    if (this.formulaire.valid) {
      const nouvelElement = this.formulaire.value;
      this.liste.push(nouvelElement);
      this.rechercher();
      this.formulaire.reset();
    }
  }

  rechercher() {
    if (!this.searchText) {
      this.listeFiltre = [...this.liste];
    } else {
      const recherche = this.searchText.toLowerCase();
      this.listeFiltre = this.liste.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(recherche)
        )
      );
    }
  }

  retour() {
    this.router.navigate(['/stock']);
  }
}
