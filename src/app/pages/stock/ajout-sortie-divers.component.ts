import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { MagasinService } from 'src/app/services/magasin.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ajout-sortie-divers',
  standalone: true,
  templateUrl: './ajout-sortie-divers.component.html',
  styleUrls: ['./ajout-sortie-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AjoutSortieDiversComponent implements OnInit {
  form!: FormGroup;
  articles: any[] = [];
  fournisseurs: any[] = [];
  clients: any[] = [];
  magasins: any[] = [];
  stocks: any[] = [];
  resultats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private magasinService: MagasinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
  numeroBE: [''],
  fournisseur: [''],
  client: [''],
  origine: [''],
  date: [''], // ✅ Obligatoire pour éviter l'erreur
  responsable: [''],
  motif: [''],
  spl: [''],
  valeurBE: [''],
  etat: [''],
  facture: [''],
  magasin: [''],
  description: [''],
  articleId: [''],
  stockId: [''],
  quantite: [''],
  couleur: [''],
  lot: [''],
  oa: [''],
  laize: [''],
  qteYard: ['']
});


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
    this.articleService.getAll().subscribe(data => {
      this.articles = data || [];
    });

    this.articleService.getFournisseurs().subscribe(res => {
      this.fournisseurs = res || [];
    });

    this.articleService.getClients().subscribe(res => {
      this.clients = res || [];
    });

    this.stockService.getAll().subscribe(res => {
      this.stocks = res || [];
    });

    this.magasinService.getAll().subscribe(res => {
      this.magasins = res.magasins || [];
    });

    this.mouvementService.getAll('sorties/divers').subscribe((data: any) => {
      this.resultats = Array.isArray(data?.bonMouvements) ? data.bonMouvements : [];
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('❌ Veuillez remplir tous les champs obligatoires.');
      console.warn('Formulaire invalide', this.form.value);
      return;
    }

    const formValue = this.form.value;
    const payload = {
      numero: formValue.numeroBE,
      fournisseurId: formValue.fournisseur,
      client: formValue.client,
      origine: formValue.origine,
      date: new Date(formValue.dateMouvement),
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
      type: 'SORTIE_DIVERS',
      validation: false
    };

    this.mouvementService.create('sorties/divers', payload).subscribe({
      next: (res) => {
        alert('✅ Sortie Divers ajoutée avec succès');
        this.resultats = [res];
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout :', err);
        alert('❌ Erreur : ' + (err.error?.message || err.message || 'Erreur inconnue'));
      }
    });
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sorties Divers');
    XLSX.writeFile(workbook, 'sortie_divers.xlsx');
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
    doc.save('sortie_divers.pdf');
  }
}
