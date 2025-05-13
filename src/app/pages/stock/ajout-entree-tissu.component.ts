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
  magasins: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private bonMouvementService: BonMouvementService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      numeroBE: ['', Validators.required],
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

    this.articleService.getAll().subscribe(data => this.articles = data);
    this.articleService.getFournisseurs().subscribe(data => this.fournisseurs = data);
    this.articleService.getClients().subscribe(data => this.clients = data);
    this.stockService.getAll().subscribe(data => this.magasins = data);
  }

  rechercherArticles(): void {
    const criteria: any = {};
    if (this.searchForm.value.famille !== 'Tous') criteria.famille = this.searchForm.value.famille;
    if (this.searchForm.value.sousFamille !== 'Tous') criteria.sousFamille = this.searchForm.value.sousFamille;
    if (this.searchForm.value.reference) criteria.reference = this.searchForm.value.reference;
    if (this.searchForm.value.referenceFournisseur) criteria.referenceFournisseur = this.searchForm.value.referenceFournisseur;
    if (this.searchForm.value.designation) criteria.designation = this.searchForm.value.designation;

    this.articleService.search(criteria).subscribe(result => {
      this.resultats = result.articles;
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

  onSubmit(): void {
    if (this.addForm.invalid) return;

    const payload = {
      ...this.addForm.value,
      dateMouvement: this.addForm.value.date
    };

    this.bonMouvementService.create('entrees/tissu', payload).subscribe(() => {
      this.addForm.reset();
      alert('✅ Entrée tissu ajoutée avec succès');
    });
  }

  // ✅ Export Excel
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.resultats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entrées Tissu');
    XLSX.writeFile(workbook, 'entrees-tissu.xlsx');
  }

  // ✅ Export PDF
  exportToPDF(): void {
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
