import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-entree-tissu',
  templateUrl: './entree-tissu.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class EntreeTissuComponent implements OnInit {
  searchForm!: FormGroup;
  addForm!: FormGroup;

  articles: any[] = [];
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
    this.loadStocks();
    this.getAllEntrees();
  }

  initForms(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      dateMin: [''],
      dateMax: ['']
    });

    this.addForm = this.fb.group({
      articleId: ['', Validators.required],
      entiteStockId: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required]
    });
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe((data: any) => {
      this.articles = data;
    });
  }

  loadStocks(): void {
    this.stockService.getAll().subscribe((data: any) => {
      this.stocks = data;
    });
  }

  getAllEntrees(): void {
    this.mouvementService.getEntreesTissu().subscribe((res: any) => {
      this.resultats = res.bonMouvements || [];
    });
  }

  rechercher(): void {
    const params = this.searchForm.value;
    this.mouvementService.rechercherEntreesTissu(params).subscribe((res: any) => {
      this.resultats = res.bonMouvements || [];
    });
  }

  annulerRecherche(): void {
    this.searchForm.reset();
    this.getAllEntrees();
  }

  ajouterEntree(): void {
    if (this.addForm.invalid) return;
    const payload = this.addForm.value;
    this.mouvementService.ajouterEntreeTissu(payload).subscribe(() => {
      this.addForm.reset();
      this.getAllEntrees();
    });
  }
}
