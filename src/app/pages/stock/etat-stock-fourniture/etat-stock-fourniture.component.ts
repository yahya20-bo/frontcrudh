import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';

@Component({
  selector: 'app-etat-stock-fourniture',
  standalone: true,
  templateUrl: './etat-stock-fourniture.component.html',
  styleUrls: ['./etat-stock-fourniture.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EtatStockFournitureComponent implements OnInit {
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
      stockName: ['']
    });

    this.articleService.getAll().subscribe((data: any) => this.articles = data);
    this.getEtatStock();
  }

  getEtatStock() {
    this.stockService.getAll().subscribe((data: any) => this.stocks = data);
  }

  onSearch() {
    const params = this.searchForm.value;
    this.stockService.getAll().subscribe((data: any[]) => {
      this.stocks = data.filter((s: any) =>
        (!params.articleId || s.article?.id == params.articleId) &&
        (!params.stockName || s.nom?.toLowerCase().includes(params.stockName.toLowerCase()))
      );
    });
  }
}
