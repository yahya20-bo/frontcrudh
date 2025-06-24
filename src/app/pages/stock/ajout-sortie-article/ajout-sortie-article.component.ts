import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { MagasinService } from 'src/app/services/magasin.service';

import { Article } from 'src/app/models/article.model';
import { EntiteStock } from 'src/app/models/entite-stock.model';
import { Magasin } from 'src/app/models/magasin.model';

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
  articles: Article[] = [];
  fournisseurs: any[] = [];
  clients: any[] = [];
  stocks: EntiteStock[] = [];
  magasins: Magasin[] = [];
  resultats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private bonMouvementService: BonMouvementService,
    private magasinService: MagasinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numeroBE: ['', Validators.required],
      fournisseur: [null],
      client: [''],
      origine: [''],
      date: ['', Validators.required],
      responsable: [''],
      motif: [''],
      spl: [''],
      valeurBE: [''],
      etat: [''],
      facture: [''],
      magasin: [null],
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

    // Filtrer les entités de stock en fonction du magasin sélectionné
    this.form.get('magasin')?.valueChanges.subscribe(magasinId => {
      if (magasinId) {
        this.loadStocksByMagasin(magasinId);
      } else {
        this.stocks = [];
      }
    });

    this.chargerDonnees();
  }

  loadStocksByMagasin(magasinId: number): void {
    this.stockService.getAll().subscribe(res => {
      this.stocks = (res || []).filter(stock => stock.magasinId !== undefined && +stock.magasinId === +magasinId);
    });
  }

  chargerDonnees(): void {
    this.articleService.getAll().subscribe(data => this.articles = data || []);
    this.articleService.getFournisseurs().subscribe(res => this.fournisseurs = res || []);
    this.articleService.getClients().subscribe(res => this.clients = res || []);

    this.stockService.getAll().subscribe(res => this.stocks = res || []);
    this.magasinService.getAll().subscribe(res => {
      this.magasins = res.magasins || [];
    });
  }

  onSubmit(): void {
    const formValue = this.form.value;

    const payload = {
      numero: formValue.numeroBE,
      fournisseurId: formValue.fournisseur,
      client: formValue.client,
      origine: formValue.origine,
      date: new Date(formValue.date),
      responsable: formValue.responsable,
      raisonMouvementId: formValue.motif,
      spl: formValue.spl,
      valeur: +formValue.valeurBE,
      etat: formValue.etat,
      daeFacture: formValue.facture,
      magasinId: formValue.magasin,
      description: formValue.description,
      produitId: formValue.articleId,
      entiteStockDesignation: formValue.stockId,
      quantite: +formValue.quantite,
      couleurDesignation: formValue.couleur,
      refProduit: formValue.lot,
      numOF: formValue.oa,
      codeConception: formValue.laize,
      qteTotalePhysique: +formValue.qteYard,
      sortie: true,
      type: 'SORTIE_ARTICLE',
      validation: false
    };

    this.bonMouvementService.create('sorties/article', payload).subscribe({
      next: (res) => {
        alert('✅ Sortie article enregistrée avec succès');
        this.resultats = [res];
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
      },
      error: (err) => {
        console.error('Erreur lors de l’enregistrement :', err);
        alert('❌ Échec de l’opération');
      }
    });
  }

  exportToExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.resultats);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sortie Article');
    XLSX.writeFile(wb, 'rapport_sortie_article.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Article', 'Quantité', 'Date']],
      body: this.resultats.map(item => [
        item.produitDesignation || '',
        item.quantite || '',
        item.date || ''
      ])
    });
    doc.save('rapport_sortie_article.pdf');
  }

  retour(): void {
    this.router.navigate(['/stock/sortie-article']);
  }
}
