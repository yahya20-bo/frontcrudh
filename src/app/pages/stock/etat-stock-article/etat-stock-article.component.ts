import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/services/article.service';
import { StockService } from 'src/app/services/stock.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-etat-stock-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './etat-stock-article.component.html',
  styleUrls: ['./etat-stock-article.component.scss']
})
export class EtatStockArticleComponent implements OnInit {
  searchForm!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];
  resultats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      stockName: ['']
    });

    this.articleService.getAll().subscribe(res => this.articles = res);
    this.stockService.getAll().subscribe(res => this.stocks = res);
  }

  filtrer(): void {
    const { articleId, stockName } = this.searchForm.value;

    // Simuler une recherche (à remplacer par appel API réel)
    this.resultats = this.stocks
      .filter(s => !stockName || s.nom.toLowerCase().includes(stockName.toLowerCase()))
      .map(s => ({
        article: this.articles.find(a => a.id == articleId)?.designation || 'Tous',
        reference: this.articles.find(a => a.id == articleId)?.ref || '-',
        stock: s.nom,
        quantite: Math.floor(Math.random() * 100) // valeur simulée
      }));
  }

  reset(): void {
    this.searchForm.reset();
    this.resultats = [];
  }

  exportExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'EtatStockArticle');
    XLSX.writeFile(workbook, 'etat-stock-article.xlsx');
  }

  exportPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Article', 'Référence', 'Stock', 'Quantité Disponible']],
      body: this.resultats.map(r => [r.article, r.reference, r.stock, r.quantite])
    });
    doc.save('etat-stock-article.pdf');
  }
}
