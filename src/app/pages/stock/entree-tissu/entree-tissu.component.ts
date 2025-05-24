import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { ExportService } from 'src/app/services/export.service';
import { RouterModule } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private mouvementService: BonMouvementService,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadArticles();
    this.loadFournisseurs();
    this.loadStocks();
    this.loadMagasins();
    this.getAllEntrees();
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
    this.stockService.getAll().subscribe((res: any) => {
      this.magasins = Array.isArray(res.magasins) ? res.magasins : [];
    });
  }

  getAllEntrees(): void {
    this.mouvementService.getEntreesTissu().subscribe((res: any) => {
      this.resultats = Array.isArray(res.bonMouvements) ? res.bonMouvements : [];
    });
  }

  rechercher(): void {
  const params = this.searchForm.value;
  this.mouvementService.rechercherEntreesTissu(params).subscribe((res: any) => {
    this.resultats = res?.bonMouvements ?? [];
  });
}

  annulerRecherche(): void {
    this.searchForm.reset();
    this.getAllEntrees();
  }

  exportExcel(): void {
    this.exportService.exportToExcel(this.resultats, 'entrees-tissu');
  }

  exportPDF(): void {
    const headers = ['articleDesignation', 'entiteStockDesignation', 'quantite', 'date'];
    this.exportService.exportToPDF(headers, this.resultats, 'entrees-tissu');
  }
}
