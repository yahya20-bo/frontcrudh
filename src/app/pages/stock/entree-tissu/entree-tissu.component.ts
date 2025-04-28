import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // 👉 Ajouter ici
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entree-tissu',
  templateUrl: './entree-tissu.component.html',
  styleUrls: ['./entree-tissu.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,            // 👉 Ajouter ici dans imports
    NgxDatatableModule
  ]
})
export class EntreeTissuComponent {

  entreeForm: FormGroup;
  tissus: any[] = [];
  tissusFiltre: any[] = [];
  searchText: string = '';

  columns = [
    { prop: 'nom', name: 'Nom du tissu' },
    { prop: 'quantite', name: 'Quantité' },
    { prop: 'fournisseur', name: 'Fournisseur' },
    { prop: 'dateEntree', name: "Date d'entrée" }
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.entreeForm = this.fb.group({
      nom: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      fournisseur: ['', Validators.required],
      dateEntree: ['', Validators.required]
    });
  }

  ajouterTissu() {
    if (this.entreeForm.valid) {
      this.tissus.push(this.entreeForm.value);
      this.tissusFiltre = [...this.tissus];
      this.toastr.success('Tissu ajouté avec succès !');
      this.entreeForm.reset();
    } else {
      this.toastr.error('Veuillez remplir tous les champs correctement.');
    }
  }

  rechercherTissu() {
    const keyword = this.searchText.toLowerCase();
    this.tissusFiltre = this.tissus.filter(tissu =>
      tissu.nom.toLowerCase().includes(keyword) ||
      tissu.fournisseur.toLowerCase().includes(keyword)
    );
  }
}
