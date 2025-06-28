import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';


import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Magasin } from 'src/app/models/magasin.model';
import { MagasinService } from 'src/app/services/magasin.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-sortie-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './sortie-article.component.html',
  styleUrls: ['./sortie-article.component.scss']
})
export class SortieArticleComponent implements OnInit {
  searchForm!: FormGroup;
  articles: any[] = [];
  fournisseurs: any[] = [];
  stocks: any[] = [];
  resultats: any[] = [];
  clients: any[] = [];
    magasins: Magasin[] = [];
  
 constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private router: Router ,
     private magasinService: MagasinService

  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      dateMin: [''],
      dateMax: [''],
      numeroBE: [''],
      fournisseurId: [''],
      client: [''],
      origine: [''],
      responsable: [''],
      raisonEntree: [''],
      spl: [''],
      magasinId: [''],
      valeurBE: [''],
      etat: [''],
      facture: ['']
    });

    this.loadArticles();
    this.loadStocks();
    this.loadFournisseurs();
    this.chargerDonnees(); // Charger les données des clients
    this.loadMagasins(); // Charger les données des magasins
  }
  

  loadArticles(): void {
    this.articleService.getAll().subscribe((res: Article[]) => {
      this.articles = res || [];
      console.log('Articles chargés :', this.articles); // ← Ajoute ça pour voir dans la console

      // Simulation des résultats (à remplacer par un appel réel à BonMouvement)
   this.resultats = this.articles.map((a) => ({
  articleId: a.id,
  articleDesignation: a.designation,
  ref: a.ref || '',
  reference: a.reference || '',
  prixUnitaire: a.prixUnitaire || 0,
  poidsBrut: a.poidsBrut || 0,
  pmp: a.pmp || 0,
  besoin: a.besoin || 0,
  tva: a.tva || 0,
  date: a.dateCreation || '2025-01-01',

  entiteStockDesignation: a.magasin?.nom || 'Inconnu',
  quantite: Math.floor(Math.random() * 50) + 1,

  fournisseurNom: a.fournisseur?.nom || 'Inconnu',
  client: a.client || '',
  origine: a.origine || '',
  responsable: a.responsable || '',
  raisonEntree: a.raisonEntree || '',
  valeurBE: typeof a.valeurBe === 'number' ? a.valeurBe : 0,
  etat: a.etat || '',
  spl: a.spl || ''
}));

  } );
  }

  loadStocks(): void {
    this.stockService.getAll().subscribe((res) => {
      this.stocks = res || [];
    });
  }
  loadMagasins(): void {
    this.magasinService.getAll().subscribe(res => {
  console.log('Magasins chargés :', res); // ← Ajoute ça pour voir dans la console
this.magasins = res.magasins || [];
    });
  }

  loadFournisseurs(): void {
    this.articleService.getFournisseurs().subscribe((res) => {
      this.fournisseurs = Array.isArray(res) ? res : [];
    });
  }

  rechercher(): void {
    const criteria = this.searchForm.value;
    this.resultats = this.resultats.filter((r) =>
      (!criteria.articleId || r.articleDesignation?.toLowerCase().includes(criteria.articleId.toString().toLowerCase())) &&
      (!criteria.dateMin || new Date(r.date) >= new Date(criteria.dateMin)) &&
      (!criteria.dateMax || new Date(r.date) <= new Date(criteria.dateMax))
    );
  }
  chargerDonnees(): void {
    
    this.articleService.getClients().subscribe(res => {
      this.clients = res || [];
    });

    
  }

  annuler(): void {
    this.searchForm.reset();
    this.loadArticles(); // recharge les résultats simulés
  }

  goToAjout(): void {
    this.router.navigate(['/ajout-entree-article']);
  }
exportExcel(): void {
  const exportData = this.resultats.map((item) => ({
    ID: item.articleId,
    Désignation: item.articleDesignation,
    Réf: item.ref,
    'Prix unitaire': item.prixUnitaire,
    'Poids brut': item.poidsBrut,
    PMP: item.pmp,
    Besoin: item.besoin,
    TVA: item.tva,
    'Date création': item.date
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Entrées Article');
  XLSX.writeFile(workbook, 'entrees_article.xlsx');
}

exportPDF(): void {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['ID', 'Désignation', 'Réf', 'Prix unitaire', 'Poids brut', 'PMP', 'Besoin', 'TVA', 'Date création']],
    body: this.resultats.map((item) => [
      item.articleId || '',
      item.articleDesignation || '',
      item.ref || '',
      item.prixUnitaire || '',
      item.poidsBrut || '',
      item.pmp || '',
      item.besoin || '',
      item.tva || '',
      item.date || ''
    ])
  });
  doc.save('entrees_article.pdf');
}
}