// ✅ entree-tissu.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-entree-tissu',
  templateUrl: './entree-tissu.component.html',
  styleUrls: ['./entree-tissu.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EntreeTissuComponent implements OnInit {
  searchForm!: FormGroup;
  articles: any[] = [];
  fournisseurs: any[] = [];
  magasins: any[] = [];
  stocks: any[] = [];
  resultats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private mouvementService: BonMouvementService,
    private articleService: ArticleService,
    private stockService: EntiteStockService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadArticles();
    this.loadFournisseurs();
    this.loadStocks();
    this.loadMagasins();
    this.getAllEntrees();
  }

  initForms(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      dateMin: [''],
      dateMax: [''],
      numeroBE: [''],
      fournisseurId: [''],
      client: [''],
      origine: [''],
      responsable: [''],
      raisonEntree: [''],
      spl: [''],
      valeurBE: [''],
      etat: [''],
      facture: [''],
      magasinId: [''],
    });
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe((res: any) => {
      this.articles = res.articles || res;
    });
  }

  loadFournisseurs(): void {
    this.articleService.getAll().subscribe((res: any) => {
      this.fournisseurs = res.fournisseurs || res;
    });
  }

  loadStocks(): void {
    this.stockService.getAll().subscribe((res: any) => {
      this.stocks = res;
    });
  }

  loadMagasins(): void {
    this.stockService.getAll().subscribe((res: any) => {
      this.magasins = res.magasins || res;
    });
  }

  getAllEntrees(): void {
    this.mouvementService.getEntreesTissu().subscribe((res: any) => {
      this.resultats = res.bonMouvements || res;
    });
  }

  rechercher(): void {
    const params = this.searchForm.value;
    this.mouvementService.rechercherEntreesTissu(params).subscribe((res: any) => {
      this.resultats = res.bonMouvements || res;
    });
  }

  annulerRecherche(): void {
    this.searchForm.reset();
    this.getAllEntrees();
  }
}

