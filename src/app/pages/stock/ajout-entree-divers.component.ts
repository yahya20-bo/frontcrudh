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
  selector: 'app-ajout-entree-divers',
  standalone: true,
  templateUrl: './ajout-entree-divers.component.html',
  styleUrls: ['./ajout-entree-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AjoutEntreeDiversComponent implements OnInit {
  addForm!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];
  resultats: any[] = [];
  fournisseurs: any[] = [];
  clients: any[] = [];
  magasins: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
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

    this.addForm.get('magasin')?.valueChanges.subscribe(magasinId => {
      if (magasinId) {
        this.loadStocksByMagasin(magasinId);
      } else {
        this.stocks = [];
      }
    });

    this.chargerDonnees();
    this.fetchResultats();
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
      console.log('STOCKS :', this.stocks);

      this.magasins = [...new Map(
        this.stocks
          .filter(s => s.magasinId)
          .map(s => [s.magasinId, {
            id: s.magasinId,
            designation: s.nomMagasin || s.designation || ('Magasin ' + s.magasinId)
          }])
      ).values()];

      console.log('MAGASINS CONSTRUITS :', this.magasins);
    });
  }

  onSubmit(): void {
    if (this.addForm.invalid) {
      alert('❌ Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formValue = this.addForm.value;

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
      sortie: false,
      type: 'ENTREE_DIVERS',
      validation: false
    };

    this.mouvementService.create('entrees/divers', payload).subscribe({
      next: (res) => {
        alert('✅ Entrée Divers enregistrée avec succès');
        this.resultats = [res];
        this.addForm.reset();
        this.addForm.markAsPristine();
        this.addForm.markAsUntouched();
      },
      error: (err) => {
        console.error('Erreur lors de l’enregistrement :', err);
        alert('❌ Erreur : ' + (err.error?.message || err.message || 'Erreur inconnue'));
      }
    });
  }

  fetchResultats(): void {
    this.mouvementService.getAll('entrees/divers').subscribe((data: any) => {
      this.resultats = data?.bonMouvements ?? [];
    });
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entrées Divers');
    XLSX.writeFile(workbook, 'entree_divers.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Article', 'Quantité', 'Stock', 'Date']],
      body: this.resultats.map(item => [
        item.article?.designation || '',
        item.quantite || '',
        item.entiteStock || '',
        item.dateMouvement || ''
      ])
    });
    doc.save('entree_divers.pdf');
  }

  retourAccueil(): void {
    this.router.navigate(['/stock/entree-divers']);
  }
}
