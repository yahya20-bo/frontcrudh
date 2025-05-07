import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../../../services/article.service'; // adapté à la profondeur
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

@Component({
  selector: 'app-entree-divers',
  standalone: true,
  templateUrl: './entree-divers.component.html',
  styleUrls: ['./entree-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class EntreeDiversComponent implements OnInit {
  articles: any[] = [];
  stocks: any[] = [];
  fournisseurs: any[] = [];
  mouvements: any[] = [];

  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      ref: [''],
      designation: [''],
      dateDebut: [''],
      dateFin: [''],
      responsable: [''],
      spl: [''],
      origine: [''],
      raison: [''],
      fournisseur: [''],
      magasin: [''],
      numeroBE: [''],
      client: [''],
      etat: [''],
      facture: [''],
      valeurBE: ['']
    });

    this.loadData();
  }

  loadData() {
    this.articleService.getAll().subscribe(data => this.articles = data.articles);
    this.stockService.getAll().subscribe(data => this.stocks = data);
    // ✅ Correction : appel via articleService (pas mouvementService)
    this.articleService.getFournisseurs().subscribe((data: any) => this.fournisseurs = data);
    this.getAll();
  }

  getAll() {
    this.mouvementService.getAll('entrees/divers').subscribe(data => this.mouvements = data);
  }

  onSearch() {
    const params = this.searchForm.value;
    this.mouvementService.search('entrees/divers', params).subscribe(data => this.mouvements = data);
  }

  resetSearch() {
    this.searchForm.reset();
    this.getAll();
  }
}
