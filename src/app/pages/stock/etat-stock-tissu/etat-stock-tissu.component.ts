import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-etat-stock-tissu',
  standalone: true,
  templateUrl: './etat-stock-tissu.component.html',
  styleUrls: ['./etat-stock-tissu.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EtatStockTissuComponent implements OnInit {
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
    this.articleService.getAll().subscribe((data: any) => {
      // ✅ si data est un tableau
      this.articles = Array.isArray(data) ? data : data.articles || [];
    });

    this.stockService.getAll().subscribe((data: any[]) => {
      this.stocks = data.filter((s: any) => s.article?.type === 'TISSU');
      this.resultats = [...this.stocks];
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
    this.resultats = [...this.stocks];
  }

  exportExcel(): void {
    this.exportService.exportToExcel(this.resultats, 'etat-stock-tissu');
  }

  exportPDF(): void {
    const headers = ['article.libelle', 'article.reference', 'article.couleur', 'nom', 'quantite'];
    const data = this.resultats.map((s: any) => ({
      'article.libelle': s.article?.libelle,
      'article.reference': s.article?.reference,
      'article.couleur': s.article?.couleur,
      'nom': s.nom,
      'quantite': s.quantite
    }));
    this.exportService.exportToPDF(headers, data, 'etat-stock-tissu');
  }
}
