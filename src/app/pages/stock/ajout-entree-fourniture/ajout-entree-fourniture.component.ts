import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ResultatEntreeFourniture } from 'src/app/models/resultat-entree-fourniture.model';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AjoutEntreeFourniturePayload {
  numeroBE: string;
  fournisseur: number;
  client: number;
  origine: string;
  date: string;
  responsable: string;
  motif: string;
  spl: string;
  valeurBE: string;
  etat: string;
  facture: string;
  magasin: string;
  description: string;
  articleId: number;
  stockId: number;
  quantite: number;
  couleur: string;
  lot: string;
  oa: string;
  laize: string;
  qteYard: string;
  dateMouvement?: string;
}

@Component({
  selector: 'app-ajout-entree-fourniture',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ajout-entree-fourniture.component.html',
  styleUrls: ['./ajout-entree-fourniture.component.scss']
})
export class AjoutEntreeFournitureComponent implements OnInit {
  form!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];
  fournisseurs: any[] = [];
  clients: any[] = [];
  magasins: any[] = [];
  resultats: ResultatEntreeFourniture[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.chargerDonnees();
  }

  initForm(): void {
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
  }

  chargerDonnees(): void {
    this.articleService.getAll().subscribe({
      next: res => this.articles = Array.isArray(res) ? res : [],
      error: err => {
        this.articles = [];
        console.error('❌ Erreur articles', err);
      }
    });

    this.articleService.getFournisseurs().subscribe({
      next: res => this.fournisseurs = Array.isArray(res) ? res : [],
      error: err => {
        this.fournisseurs = [];
        console.error('❌ Erreur fournisseurs', err);
      }
    });

    this.articleService.getClients().subscribe({
      next: res => this.clients = Array.isArray(res) ? res : [],
      error: err => {
        this.clients = [];
        console.error('❌ Erreur clients', err);
      }
    });

    this.stockService.getAll().subscribe({
      next: res => {
        const data = Array.isArray(res) ? res : [];
        this.stocks = data;
        this.magasins = data;
      },
      error: err => {
        this.stocks = [];
        this.magasins = [];
        console.error('❌ Erreur stocks', err);
      }
    });
  }

 onSubmit(): void {
  if (this.form.invalid) return;

  const formValue = this.form.value;

  // 🔄 Construction d'un objet compatible avec BonMouvement (et pas AjoutEntreeFourniturePayload)
  const payload = {
    numero: formValue.numeroBE,
    fournisseurId: formValue.fournisseur,
    client: formValue.client,
    origine: formValue.origine,
    date: new Date(formValue.date), // ✅ requis par le modèle
    dateMouvement: formValue.date,  // string ou Date selon ton backend
    responsable: formValue.responsable,
    raisonMouvementDesignation: formValue.motif,
    spl: formValue.spl,
    valeur: +formValue.valeurBE,
    etat: formValue.etat,
    daeFacture: formValue.facture,
    magasinId: formValue.magasin ? +formValue.magasin : undefined,

    description: formValue.description,
    produitId: formValue.articleId,
    entiteStockId: formValue.stockId,
    resultatQte: formValue.quantite,
    couleur: formValue.couleur,
    lot: formValue.lot,
    oa: formValue.oa,
    laize: formValue.laize,
    qteYard: formValue.qteYard,
    sortie: false
  };

  this.mouvementService.create('entrees/fourniture', payload).subscribe(() => {
    alert('✅ Entrée Fourniture ajoutée avec succès');

    const resultat: ResultatEntreeFourniture = {
      reference: this.getArticleRef(payload.produitId),
      designation: this.getArticleDesignation(payload.produitId),
      quantite: payload.resultatQte,
      entiteStock: this.getStockNom(payload.entiteStockId),
      date: payload.dateMouvement
    };

    this.resultats.push(resultat);
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
    return s?.nom || s?.designation || '-';
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entrées Fourniture');
    XLSX.writeFile(workbook, 'entrees-fourniture.xlsx');
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
    doc.save('entrees-fourniture.pdf');
  }
}
