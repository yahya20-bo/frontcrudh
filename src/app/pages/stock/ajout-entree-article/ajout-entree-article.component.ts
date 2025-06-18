import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

import { Article } from 'src/app/models/article.model';
import { EntiteStock } from 'src/app/models/entite-stock.model';

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
  articles: Article[] = [];
  fournisseurs: any[] = [];
  clients: any[] = [];
  stocks: EntiteStock[] = [];
  magasins: any[] = [];
  resultats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private bonMouvementService: BonMouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numeroBE: ['', Validators.required],
      fournisseur: [null],
      client: [null],
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
      articleId: [null, Validators.required],
      stockId: [null, Validators.required],
      quantite: [0, Validators.required],
      couleur: [''],
      lot: [''],
      oa: [''],
      laize: [''],
      qteYard: ['']
    });

    this.chargerDonnees();
  }

  chargerDonnees(): void {
    this.articleService.getAll().subscribe((data: Article[]) => {
      this.articles = data || [];
    });
    this.articleService.getFournisseurs().subscribe((res) => {
      this.fournisseurs = res || [];
    });
    this.articleService.getClients().subscribe((res) => {
      this.clients = res || [];
    });
    this.stockService.getAll().subscribe(res => {
      this.stocks = res || [];
    });

    // Optionnel : activer si getMagasins() existe
    // this.articleService.getMagasins().subscribe((data: any[]) => {
    //   this.magasins = data || [];
    // });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value;

    this.bonMouvementService.create('entrees/article', payload).subscribe({
      next: (res) => {
        alert('Entrée article ajoutée avec succès');
        this.resultats = [res]; // corrige NG0900
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout :', err);
        alert('Erreur lors de l’enregistrement');
      }
    });
  }

  exportToExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.resultats);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entrée Article');
    XLSX.writeFile(wb, 'rapport_entree_article.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Article', 'Quantité', 'Date']],
      body: this.resultats.map(item => [
        item.article?.designation || '',
        item.quantite || '',
        item.date || ''
      ])
    });
    doc.save('rapport_entree_article.pdf');
  }

  retour(): void {
    this.router.navigate(['/stock/entree-article']);
  }
}
