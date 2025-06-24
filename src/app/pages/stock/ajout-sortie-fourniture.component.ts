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
import { ResultatSortieFourniture } from 'src/app/models/resultat-sortie-fourniture.model';

@Component({
  selector: 'app-ajout-sortie-fourniture',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ajout-sortie-fourniture.component.html',
  styleUrls: ['./ajout-sortie-fourniture.component.scss']
})
export class AjoutSortieFournitureComponent implements OnInit {
  form!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];
  fournisseurs: any[] = [];
  clients: any[] = [];
  magasins: any[] = [];
  resultats: ResultatSortieFourniture[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private magasinService: MagasinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();

    this.form.get('magasin')?.valueChanges.subscribe(magasinId => {
      this.form.get('stockId')?.setValue(null);
      if (magasinId) {
        this.loadStocksByMagasin(magasinId);
      } else {
        this.stocks = [];
      }
    });
  }

  initForm(): void {
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
  }

  loadData(): void {
    this.articleService.getAll().subscribe(res => {
      this.articles = res || [];
    });

    this.articleService.getFournisseurs().subscribe(res => this.fournisseurs = res || []);
    this.articleService.getClients().subscribe(res => this.clients = res || []);
    this.magasinService.getAll().subscribe(res => {
      this.magasins = res.magasins || [];
    });

    this.stockService.getAll().subscribe(res => {
      this.stocks = res || [];
    });
  }

  loadStocksByMagasin(magasinId: number): void {
    this.stockService.getAll().subscribe(res => {
      this.stocks = (res || []).filter(stock => stock.magasinId !== undefined && +stock.magasinId === +magasinId);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control && control.invalid) {
          console.warn(`- Champ "${key}" est invalide. Erreurs:`, control.errors);
        }
      });
      this.form.markAllAsTouched();
      alert('❌ Veuillez remplir tous les champs requis.');
      return;
    }

    const formValue = this.form.value;

    const payload = {
      numero: formValue.numeroBE,
      fournisseurId: formValue.fournisseur,
      client: formValue.client,
      origine: formValue.origine,
      date: new Date(formValue.date),
      responsable: formValue.responsable,
      raisonMouvementDesignation: formValue.motif,
      spl: formValue.spl,
      valeur: +formValue.valeurBS,
      etat: formValue.etat,
      daeFacture: formValue.facture,
      magasinId: formValue.magasin,
      description: formValue.description,
      produitId: formValue.articleId,
      entiteStockId: formValue.stockId,
      resultatQte: +formValue.quantite,
      refProduit: formValue.lot,
      numOF: formValue.oa,
      codeConception: formValue.laize,
      qteTotalePhysique: +formValue.qteYard,
      sortie: true,
      type: 'SORTIE_FOURNITURE',
      validation: false
    };

    delete payload.entiteStockId; // ✅ Supprime le champ du payload
    console.log('Payload à envoyer :', payload);
  

    this.mouvementService.create('sorties/fourniture', payload).subscribe({
      next: () => {
        alert('✅ Sortie Fourniture ajoutée avec succès');
        const resultat: ResultatSortieFourniture = {
          produitId: payload.produitId,
          entiteStockId: payload.entiteStockId,
          clientId: 0,
          numeroBE: payload.numero,
          origine: payload.origine || '',
          responsable: payload.responsable || '',
          motif: payload.raisonMouvementDesignation || '',
          spl: payload.spl || '',
          valeurBS: payload.valeur || 0,
          etat: payload.etat || '',
          resultatQte: payload.resultatQte,
          reference: '',
          designation: '',
          quantite: payload.resultatQte,
          entiteStock: '',
          date: (payload.date instanceof Date) ? payload.date.toISOString() : String(payload.date)
        };
        this.resultats.push(resultat);
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout :', err);
        alert('❌ Erreur lors de l’enregistrement');
      }
    });
  }

  exportToExcelFourniture(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats.map(r => ({
      Référence: this.getRefFourniture(r.produitId),
      Désignation: this.getDesignationFourniture(r.produitId),
      Quantité: r.resultatQte,
      Stock: this.getNomStockFourniture(r.entiteStockId),
      Date: r.date
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sortie Fourniture');
    XLSX.writeFile(workbook, 'rapport_sortie_fourniture.xlsx');
  }

  exportToPdfFourniture(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Référence', 'Désignation', 'Quantité', 'Stock', 'Date']],
      body: this.resultats.map(r => [
        this.getRefFourniture(r.produitId),
        this.getDesignationFourniture(r.produitId),
        r.resultatQte,
        this.getNomStockFourniture(r.entiteStockId),
        r.date
      ])
    });
    doc.save('rapport_sortie_fourniture.pdf');
  }

  getRefFourniture(id: number): string {
    const article = this.articles.find(a => a.id === id);
    return article?.ref || '-';
  }

  getDesignationFourniture(id: number): string {
    const article = this.articles.find(a => a.id === id);
    return article?.designation || article?.libelle || '-';
  }

  getNomStockFourniture(id: number): string {
    const stock = this.stocks.find(s => s.id === id);
    return stock?.nom || stock?.designation || '-';
  }

  getNomMagasinFourniture(id: number): string {
    const magasin = this.magasins.find(m => m.id === id);
    return magasin?.nom || '-';
  }

  retour(): void {
    this.router.navigate(['/stock/sortie-fourniture']);
  }
}
