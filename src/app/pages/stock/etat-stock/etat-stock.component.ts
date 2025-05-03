import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';

@Component({
  selector: 'app-etat-stock',
  standalone: true,
  templateUrl: './etat-stock.component.html',
  styleUrls: ['./etat-stock.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EtatStockComponent implements OnInit {
  searchForm!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      magasin: ['']
    });

    this.articleService.getAll().subscribe((data: any) => this.articles = data);
    this.getEtatStock();
  }

  getEtatStock() {
    // Ici tu peux appeler un endpoint /api/entitestocks/search si tu veux des filtres
    this.stockService.getAll().subscribe((data: any) => this.stocks = data);
  }

  onSearch() {
    const params = this.searchForm.value;
    this.stockService.getAll().subscribe((data: any) => {
      this.stocks = data.filter((s: any) =>
        (!params.articleId || s.article?.id == params.articleId) &&
        (!params.magasin || s.magasin?.toLowerCase().includes(params.magasin.toLowerCase()))
      );
    });
  }
}
