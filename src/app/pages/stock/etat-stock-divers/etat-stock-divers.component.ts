import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { ArticleService } from 'src/app/services/article.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-etat-stock-divers',
  standalone: true,
  templateUrl: './etat-stock-divers.component.html',
  styleUrls: ['./etat-stock-divers.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EtatStockDiversComponent implements OnInit {
  searchForm!: FormGroup;
  stocks: any[] = [];
  articles: any[] = [];
  resultats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private stockService: EntiteStockService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      nomStock: ['']
    });

    this.loadAllData();
  }

  loadAllData(): void {
    this.articleService.getAll().subscribe(data => {
      this.articles = data.articles; ;
    });

    this.stockService.getAll().subscribe(data => {
      this.stocks = data.filter((s: any) => s.article?.type === 'DIVERS');
      this.resultats = this.stocks;
    });
  }

  filtrer(): void {
    const { articleId, nomStock } = this.searchForm.value;

    this.resultats = this.stocks.filter(stock => {
      const matchArticle = !articleId || stock.article?.id == articleId;
      const matchStock = !nomStock || stock.nom?.toLowerCase().includes(nomStock.toLowerCase());
      return matchArticle && matchStock;
    });
  }

  reinitialiser(): void {
    this.searchForm.reset();
    this.resultats = this.stocks;
  }
}
