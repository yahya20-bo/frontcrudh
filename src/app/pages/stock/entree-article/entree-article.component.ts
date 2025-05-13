import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { ArticleService } from 'src/app/services/article.service';
import { StockService } from 'src/app/services/stock.service';
import { Article } from 'src/app/models/article.model';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-entree-article',
  standalone: true,
  templateUrl: './entree-article.component.html',
  styleUrls: ['./entree-article.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  providers: [DatePipe]
})
export class EntreeArticleComponent implements OnInit {
  searchForm!: FormGroup;
  articles: Article[] = [];
  resultats: any[] = [];
  stocks: any[] = [];
  fournisseurs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: StockService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      dateMin: [''],
      dateMax: [''],
      numeroBe: [''],
      fournisseurId: [''],
      client: [''],
      origine: [''],
      responsable: [''],
      raisonEntree: [''],
      spl: [''],
      magasinId: [''],
      valeurBe: [''],
      etat: [''],
      daeFacture: ['']
    });

    this.loadArticles();
    this.loadStocks();
    this.loadFournisseurs();
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe((res: Article[]) => {
      this.articles = res;
    });
  }

  loadStocks(): void {
    this.stockService.getAll().subscribe((res: any[]) => {
      this.stocks = res;
    });
  }

  loadFournisseurs(): void {
    this.articleService.getFournisseurs().subscribe((res: any[]) => {
      this.fournisseurs = res;
    });
  }

  search(): void {
    const criteria = this.searchForm.value;
    this.resultats = this.articles.filter(a => {
      return (
        (!criteria.articleId || a.id === +criteria.articleId) &&
        (!criteria.client || a.client?.toLowerCase().includes(criteria.client.toLowerCase())) &&
        (!criteria.numeroBe || a.numeroBe?.toLowerCase().includes(criteria.numeroBe.toLowerCase()))
        // Ajouter d'autres filtres selon les besoins
      );
    });
  }

  reset(): void {
    this.searchForm.reset();
    this.resultats = [];
  }

  rechercher(): void {
    this.search();
  }

  annuler(): void {
    this.reset();
  }

  goToAjout(): void {
    this.router.navigate(['/ajout-entree-article']);
  }

  exportExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entrées Article');
    XLSX.writeFile(workbook, 'entrees_article.xlsx');
  }

  exportPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Article', 'Stock', 'Quantité', 'Date']],
      body: this.resultats.map((item: any) => [
        item.designation || '',
        item.stock?.nom || '',
        item.quantite || '',
        item.date || ''
      ])
    });
    doc.save('entrees_article.pdf');
  }
}
