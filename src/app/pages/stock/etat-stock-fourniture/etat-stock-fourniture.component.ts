import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { ExportService } from 'src/app/services/export.service';

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
  allStocks: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      stockName: ['']
    });

    this.articleService.getAll().subscribe((data: any) => {
      this.articles = data.articles || data;
    });

    this.getEtatStock();
  }

  getEtatStock() {
    this.stockService.getAll().subscribe((data: any[]) => {
      this.allStocks = data;
      this.stocks = data;
    });
  }

  onSearch() {
    const { articleId, stockName } = this.searchForm.value;
    this.stocks = this.allStocks.filter((s: any) =>
      (!articleId || s.article?.id == articleId) &&
      (!stockName || s.nom?.toLowerCase().includes(stockName.toLowerCase()))
    );
  }

  exportExcel(): void {
    this.exportService.exportToExcel(this.stocks, 'etat-stock-fourniture');
  }

  exportPDF(): void {
    const headers = ['article.libelle', 'article.reference', 'nom', 'quantite'];
    const data = this.stocks.map((s: any) => ({
      'article.libelle': s.article?.libelle,
      'article.reference': s.article?.reference,
      'nom': s.nom,
      'quantite': s.quantite
    }));
    this.exportService.exportToPDF(headers, data, 'etat-stock-fourniture');
  }
}
