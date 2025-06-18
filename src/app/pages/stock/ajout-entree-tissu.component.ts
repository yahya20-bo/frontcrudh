import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EntiteStock } from 'src/app/models/entite-stock.model';

@Component({
  selector: 'app-ajout-entree-tissu',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ajout-entree-tissu.component.html',
  styleUrls: ['./ajout-entree-tissu.component.scss']
})
export class AjoutEntreeTissuComponent implements OnInit {
  addForm!: FormGroup;
  searchForm!: FormGroup;

  articles: any[] = [];
  resultats: any[] = [];
  familles: string[] = ['Tous'];
  sousFamilles: string[] = ['Tous'];
  fournisseurs: any[] = [];
  clients: any[] = [];
  magasins: EntiteStock[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private bonMouvementService: BonMouvementService
  ) {}

  ngOnInit(): void {
    this.initForms();

    this.articleService.getAll().subscribe((data: any) => {
  this.articles = Array.isArray(data) ? data : data.articles || [];
});


    this.articleService.getFournisseurs().subscribe((res: any[]) => {
      this.fournisseurs = res || [];
    });

    this.articleService.getClients().subscribe((res: any[]) => {
      this.clients = res || [];
    });

    this.stockService.getAll().subscribe((stocks: EntiteStock[]) => {
      this.magasins = stocks || [];
    });
  }

  initForms(): void {
    this.addForm = this.fb.group({
      numero: ['', Validators.required],
      fournisseur: ['', Validators.required],
      client: ['', Validators.required],
      origine: ['', Validators.required],
      dateEntree: ['', Validators.required],
      responsable: [''],
      raisonEntree: ['', Validators.required],
      spl: ['Tous'],
      valeurBE: [''],
      etat: [''],
      facture: [''],
      description: [''],
      magasin: ['', Validators.required],
      articleId: ['', Validators.required],
      entiteStockId: ['', Validators.required],
      quantite: ['', Validators.required],
      date: ['', Validators.required],
      couleur: [''],
      lot: [''],
      oa: [''],
      laize: [''],
      qteYard: ['']
    });

    this.searchForm = this.fb.group({
      famille: ['Tous'],
      sousFamille: ['Tous'],
      reference: [''],
      referenceFournisseur: [''],
      designation: ['']
    });
  }

  getMagasinId(nom: string): number | null {
    const magasin = this.magasins.find(m => m.nom === nom);
    return magasin?.id || null;
  }

  getMagasinNom(id: number): string {
    const stock = this.magasins.find(m => m.id === id);
    return stock?.nom || '-';
  }

  onSubmit(): void {
    if (this.addForm.invalid) return;

    const formValue = this.addForm.value;

    const payload = {
      numero: formValue.numero,
      fournisseurId: formValue.fournisseur?.id || formValue.fournisseur,
      client: formValue.client,
      origine: formValue.origine,
      responsable: formValue.responsable,
      date: formValue.dateEntree,
      dateMouvement: formValue.date,
      raisonMouvementDesignation: formValue.raisonEntree,
      spl: formValue.spl,
      valeur: formValue.valeurBE,
      etat: formValue.etat,
      daeFacture: formValue.facture,
      description: formValue.description,
      magasinId: this.getMagasinId(formValue.magasin) ?? formValue.magasin,
      entiteStockDesignation: this.getMagasinNom(formValue.entiteStockId),
      produitId: formValue.articleId,
      quantite: formValue.quantite,
      couleurDesignation: formValue.couleur,
      lot: formValue.lot,
      codeConception: formValue.oa,
      refProduit: formValue.laize,
      produitDesignation: formValue.qteYard,
      typeArticle: 1,
      sortie: false
    };

    this.bonMouvementService.create('entrees/tissu', payload).subscribe(() => {
      this.addForm.reset();
      alert('✅ Entrée tissu ajoutée avec succès');
    });
  }

  rechercherArticles(): void {
    const formValue = this.searchForm.value;
    const criteria: any = {};

    if (formValue.famille !== 'Tous') criteria.famille = formValue.famille;
    if (formValue.sousFamille !== 'Tous') criteria.sousFamille = formValue.sousFamille;
    if (formValue.reference) criteria.reference = formValue.reference;
    if (formValue.referenceFournisseur) criteria.referenceFournisseur = formValue.referenceFournisseur;
    if (formValue.designation) criteria.designation = formValue.designation;

    this.articleService.search(criteria).subscribe(result => {
      this.resultats = Array.isArray(result?.articles) ? result.articles : [];
    });
  }

  annulerRecherche(): void {
    this.searchForm.reset({
      famille: 'Tous',
      sousFamille: 'Tous',
      reference: '',
      referenceFournisseur: '',
      designation: ''
    });
    this.resultats = [];
  }

  exporterExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entrées Tissu');
    XLSX.writeFile(workbook, 'entrees-tissu.xlsx');
  }

  exporterPDF(): void {
    const doc = new jsPDF();
    const cols = ["Ref Fournisseur", "Réf.", "Désignation", "Couleur", "Lot", "OA", "Laize", "Qte Yard"];
    const rows = this.resultats.map(item => [
      item.refFournisseur || '',
      item.reference || '',
      item.libelle || '',
      item.couleur || '',
      item.lot || '',
      item.oa || '',
      item.laize || '',
      item.qteYard || ''
    ]);
    autoTable(doc, { head: [cols], body: rows });
    doc.save('entrees-tissu.pdf');
  }
}
