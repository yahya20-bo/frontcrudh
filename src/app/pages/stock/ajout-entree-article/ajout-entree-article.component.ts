import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ajout-entree-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ajout-entree-article.component.html',
  styleUrls: ['./ajout-entree-article.component.scss']
})
export class AjoutEntreeArticleComponent implements OnInit {
  form!: FormGroup;
  articles: any[] = [];
  fournisseurs: any[] = [];
  clients: any[] = [];
  stocks: any[] = [];
  magasins: any[] = [];

  resultats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numeroBE: [''],
      fournisseur: [''],
      client: [''],
      origine: [''],
      date: ['', Validators.required],
      responsable: [''],
      motif: [''],
      spl: [''],
      valeurBE: [''],
      etat: [''],
      facture: [''],
      magasin: [''],
      description: [''],
      articleId: ['', Validators.required],
      stockId: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]]
    });

    this.articleService.getAll().subscribe(res => this.articles = res);
    this.articleService.getFournisseurs().subscribe(res => this.fournisseurs = res);
    this.articleService.getClients().subscribe(res => this.clients = res);
    this.stockService.getAll().subscribe(res => {
      this.stocks = res;
      this.magasins = res;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      dateMouvement: this.form.value.date
    };

    this.mouvementService.create('entrees/article', payload).subscribe(() => {
      alert('✅ Entrée Article ajoutée avec succès');

      this.resultats.push({
        reference: this.getArticleRef(payload.articleId),
        designation: this.getArticleDesignation(payload.articleId),
        quantite: payload.quantite,
        entiteStock: this.getStockNom(payload.stockId),
        date: payload.dateMouvement
      });

      this.form.reset();
    });
  }

  getArticleRef(id: number): string {
    const a = this.articles.find(a => a.id === id);
    return a?.ref || '-';
  }

  getArticleDesignation(id: number): string {
    const a = this.articles.find(a => a.id === id);
    return a?.designation || a?.libelle || '-';
  }

  getStockNom(id: number): string {
    const s = this.stocks.find(s => s.id === id);
    return s?.nom || '-';
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entrées Article');
    XLSX.writeFile(workbook, 'entrees-article.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    const head = [["Réf", "Désignation", "Quantité", "Stock", "Date"]];
    const body = this.resultats.map(r => [
      r.reference,
      r.designation,
      r.quantite,
      r.entiteStock,
      r.date
    ]);
    autoTable(doc, { head, body });
    doc.save('entrees-article.pdf');
  }
}
