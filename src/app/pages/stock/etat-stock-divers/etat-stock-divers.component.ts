import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { ArticleService } from 'src/app/services/article.service';
import { ExportService } from 'src/app/services/export.service';

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
    private articleService: ArticleService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      nomStock: ['']
    });

    this.loadAllData();
  }

  loadAllData(): void {
    // ✅ Correction du typage et gestion .articles
    this.articleService.getAll().subscribe((data: any) => {
      this.articles = Array.isArray(data) ? data : data.articles || [];
    });

    this.stockService.getAll().subscribe((data: any[]) => {
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

  exportExcel(): void {
    this.exportService.exportToExcel(this.resultats, 'etat-stock-divers');
  }

  exportPDF(): void {
    const headers = ['article.libelle', 'article.reference', 'nom', 'quantite'];
    const data = this.resultats.map((s: any) => ({
      'article.libelle': s.article?.libelle,
      'article.reference': s.article?.reference,
      'nom': s.nom,
      'quantite': s.quantite
    }));
    this.exportService.exportToPDF(headers, data, 'etat-stock-divers');
  }
}
