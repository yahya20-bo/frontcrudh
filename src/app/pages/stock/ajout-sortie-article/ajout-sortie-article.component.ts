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
  selector: 'app-ajout-sortie-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ajout-sortie-article.component.html',
  styleUrls: ['./ajout-sortie-article.component.scss']
})
export class AjoutSortieArticleComponent implements OnInit {
  form!: FormGroup;
  articles: any[] = [];
  fournisseurs: any[] = [];
  clients: any[] = [];
  stocks: any[] = [];
  magasins: any[] = [];

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
      quantite: ['', [Validators.required, Validators.min(1)]],
      couleur: [''],
      lot: [''],
      oa: [''],
      laize: [''],
      qteYard: ['']
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

    this.mouvementService.create('sorties/article', payload).subscribe(() => {
      alert('✅ Sortie article enregistrée avec succès');
      this.form.reset();
    });
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet([this.form.value]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SortieArticle');
    XLSX.writeFile(workbook, 'sortie-article.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Champ', 'Valeur']],
      body: Object.entries(this.form.value)
    });
    doc.save('sortie-article.pdf');
  }
}
