import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';

import { Article } from 'src/app/models/article.model';
import { EntreeArticleResult } from 'src/app/models/entree-article-result.model';

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
  resultats: EntreeArticleResult[] = [];
  stocks: any[] = [];
  fournisseurs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      magasinId: [''],
      valeurBE: [''],
      etat: [''],
      facture: ['']
    });

    this.loadArticles();
    this.loadStocks();
    this.loadFournisseurs();
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe((res: Article[]) => {
      this.articles = res || [];

      // Simulation des résultats (à remplacer par un appel réel à BonMouvement)
      this.resultats = this.articles.map((a) => ({
        articleDesignation: a.designation,
        entiteStockDesignation: a.magasin?.nom || 'Inconnu',
        quantite: Math.floor(Math.random() * 50) + 1,
        date: a.dateCreation || '2025-01-01'
      }));
    });
  }

  loadStocks(): void {
    this.stockService.getAll().subscribe((res) => {
      this.stocks = res || [];
    });
  }

  loadFournisseurs(): void {
    this.articleService.getFournisseurs().subscribe((res) => {
      this.fournisseurs = Array.isArray(res) ? res : [];
    });
  }

  rechercher(): void {
    const criteria = this.searchForm.value;
    this.resultats = this.resultats.filter((r) =>
      (!criteria.articleId || r.articleDesignation?.toLowerCase().includes(criteria.articleId.toString().toLowerCase())) &&
      (!criteria.dateMin || new Date(r.date) >= new Date(criteria.dateMin)) &&
      (!criteria.dateMax || new Date(r.date) <= new Date(criteria.dateMax))
    );
  }

  annuler(): void {
    this.searchForm.reset();
    this.loadArticles(); // recharge les résultats simulés
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
      body: this.resultats.map((item) => [
        item.articleDesignation,
        item.entiteStockDesignation,
        item.quantite,
        item.date
      ])
    });
    doc.save('entrees_article.pdf');
  }
}
