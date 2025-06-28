import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { ExportService } from 'src/app/services/export.service';
import { MagasinService } from 'src/app/services/magasin.service';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-entree-tissu',
  templateUrl: './entree-tissu.component.html',
  styleUrls: ['./entree-tissu.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EntreeTissuComponent implements OnInit {
  searchForm!: FormGroup;
  articles: any[] = [];
  fournisseurs: any[] = [];
  magasins: any[] = [];
  stocks: any[] = [];
  resultats: any[] = [];
    articleDesignation: string = ''; // ✅ Ajout de cette ligne


  constructor(
    private fb: FormBuilder,
    private mouvementService: BonMouvementService,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private exportService: ExportService,
    private magasinService: MagasinService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadArticles();
    this.loadFournisseurs();
    this.loadStocks();
    this.loadMagasins();
    this.rechercher();
  }

  initForms(): void {
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
      valeurBE: [''],
      etat: [''],
      facture: [''],
      magasinId: [''],
    });
  }

  private formaterDate(date: any): string | null {
    return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : null;
  }
rechercher(): void {
  const formValue = this.searchForm.value;
  const articleId = formValue.articleId ? Number(formValue.articleId) : null;
  const magasinId = formValue.magasinId ? Number(formValue.magasinId) : null;

  const params = {
    articleId: articleId,
    fournisseurId: formValue.fournisseurId ? Number(formValue.fournisseurId) : null,
    magasinId: magasinId,
    dateMin: this.formaterDate(formValue.dateMin),
    dateMax: this.formaterDate(formValue.dateMax),
    numeroBE: formValue.numeroBE || null,
    client: formValue.client || null,
    origine: formValue.origine || null,
    responsable: formValue.responsable || null,
    raisonEntree: formValue.raisonEntree || null,
    spl: formValue.spl || null,
    valeurBE: formValue.valeurBE || null,
    etat: formValue.etat || null,
    facture: formValue.facture || null,
  };

  this.mouvementService.rechercherEntreesTissu(params).subscribe((res: any) => {
    const data = Array.isArray(res) ? res : res.bonMouvements || [];

    // ✅ Double filtrage articleId + magasinId
    const mouvementsFiltres = data.filter((element: any) => {
      const matchArticle = !articleId || element.produitId === articleId;
      const matchMagasin = !magasinId || element.magasinId === magasinId;
      return matchArticle && matchMagasin;
    });

    // ✅ Construction des résultats avec designation article + nom de stock
    this.resultats = mouvementsFiltres.map((r: any) => {
      const article = this.articles.find(a => a.id === r.produitId);
      const magasin = this.magasins.find(m => m.id === r.magasinId);
      console.log('magasin trouvé :', magasin.designation);

      return {
        id: r.id,
        articleDesignation: article?.designation || '',
        quantite: r.quantite || 0,
        entiteStockDesignation: magasin.designation || '',
        fournisseurAbreviation: this.getFournisseurNom(r.fournisseurId),
        valeur: r.valeur || 0,
        etat: r.etat || '',
        date: this.formaterDate(r.date),
      };
    });

    console.log('Résultats filtrés :', this.resultats);
    this.cdr.detectChanges();
  });
}


  annulerRecherche(): void {
    this.searchForm.reset();
    this.rechercher();
  }

  voirDetails(resultat: any): void {
    const id = resultat.id;
    this.mouvementService.getById(id).subscribe((data: any) => {
      // à compléter si besoin
    });
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe((data: any) => {
      this.articles = Array.isArray(data) ? data : [];
    });
  }

  loadFournisseurs(): void {
    this.articleService.getFournisseurs().subscribe((data: any) => {
      this.fournisseurs = Array.isArray(data) ? data : [];
    });
  }

  loadStocks(): void {
    this.stockService.getAll().subscribe((res: any) => {
      this.stocks = Array.isArray(res) ? res : [];
    });
  }

  loadMagasins(): void {
    this.magasinService.getAll().subscribe((res: any) => {
      this.magasins = Array.isArray(res.magasins) ? res.magasins : [];
    });
  }

  getMagasinNom(id: number | undefined): string {
    const m = this.magasins.find((x) => x.id === id);
    return m ? m.nom : '';
  }

  getFournisseurNom(id: number | undefined): string {
    const f = this.fournisseurs.find((x) => x.id === id);
    return f ? f.nom : '';
  }

  exportExcel(): void {
    const exportData = this.resultats.map((item) => ({
      ID: item.id,
      Article: item.articleDesignation,
      Quantité: item.quantite,
      Stock: item.entiteStockDesignation,
      Fournisseur: item.fournisseurAbreviation,
      'Valeur BE': item.valeur,
      État: item.etat,
      Date: item.date
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sorties Tissu');
    XLSX.writeFile(workbook, 'sorties_tissu.xlsx');
  }

  exportPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['ID', 'Article', 'Quantité', 'Stock', 'Fournisseur', 'Valeur BE', 'État', 'Date']],
      body: this.resultats.map((item) => [
        item.id,
        item.articleDesignation,
        item.quantite,
        item.entiteStockDesignation,
        item.fournisseurAbreviation,
        item.valeur,
        item.etat,
        item.date
      ])
    });
    doc.save('sorties_tissu.pdf');
  }
}
