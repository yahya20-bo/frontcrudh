import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';


import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-sortie-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './sortie-article.component.html',
  styleUrls: ['./sortie-article.component.scss']
})
export class SortieArticleComponent implements OnInit {
  searchForm!: FormGroup;
  articles: any[] = [];
  fournisseurs: any[] = [];
  stocks: any[] = [];
  resultats: any[] = [];

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
      raisonSortie: [''],
      spl: [''],
      magasinId: [''],
      valeurBE: [''],
      etat: [''],
      facture: ['']
    });

    this.articleService.getAll().subscribe(res => this.articles = res);
    this.articleService.getFournisseurs().subscribe(res => this.fournisseurs = res);
    this.stockService.getAll().subscribe(res => this.stocks = res);
  }

  search(): void {
    const crit = this.searchForm.value;
    this.resultats = this.articles.filter(a => !crit.articleId || a.id === +crit.articleId);
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
    this.router.navigate(['/ajout-sortie-article']);
  }

  exportExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sorties Article');
    XLSX.writeFile(workbook, 'sorties-article.xlsx');
  }

  exportPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Article', 'Stock', 'Quantité', 'Date']],
      body: this.resultats.map(item => [
        item.designation || '-',
        item.stock || '-',
        item.quantite || '-',
        item.date || '-'
      ])
    });
    doc.save('sorties-article.pdf');
  }
}
