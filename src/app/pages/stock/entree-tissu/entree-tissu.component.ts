// ✅ entree-tissu.component.ts (complet, relié au backend avec design moderne)
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
    NgxDatatableModule,
    HttpClientModule
  ]
})
export class EntreeTissuComponent implements OnInit {
  entreeForm: FormGroup;
  tissus: any[] = [];
  tissusFiltre: any[] = [];
  searchText: string = '';

  colonnes = [
    { prop: 'designation', name: 'Nom du Tissu' },
    { prop: 'quantite', name: 'Quantité' },
    { prop: 'couleur', name: 'Couleur' },
    { prop: 'prixUnitaire', name: 'Prix Unitaire' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.entreeForm = this.fb.group({
      designation: ['', Validators.required],
      quantite: ['', Validators.required],
      couleur: ['', Validators.required],
      prixUnitaire: ['']
    });
  }

  ngOnInit(): void {
    this.chargerTissus();
  }

  chargerTissus(): void {
    this.http.get<any[]>('http://localhost:8080/api/articles').subscribe(
      data => {
        this.tissus = data;
        this.tissusFiltre = [...data];
      },
      error => {
        console.error('Erreur lors du chargement des tissus', error);
      }
    );
  }

  ajouter(): void {
    if (this.entreeForm.valid) {
      const nouveauTissu = this.entreeForm.value;
      this.http.post('http://localhost:8080/api/articles', nouveauTissu).subscribe(
        () => {
          this.chargerTissus();
          this.entreeForm.reset();
        },
        error => {
          console.error('Erreur lors de l’ajout', error);
        }
      );
    }
  }

  rechercher(): void {
    const texte = this.searchText.toLowerCase();
    this.tissusFiltre = this.tissus.filter(tissu =>
      tissu.designation.toLowerCase().includes(texte) ||
      tissu.couleur?.toLowerCase().includes(texte)
    );
  }

  retour(): void {
    this.router.navigate(['/stock']);
  }
}
