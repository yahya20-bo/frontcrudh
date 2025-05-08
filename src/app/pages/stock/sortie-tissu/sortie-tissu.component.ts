import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-sortie-tissu',
  templateUrl: './sortie-tissu.component.html',
  styleUrls: ['./sortie-tissu.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class SortieTissuComponent implements OnInit {
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
    this.initForm();
    this.loadArticles();
    this.loadFournisseurs();
    this.loadMagasins();
    this.loadStocks();
    this.getAllSorties();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      articleId: [''],
      dateMin: [''],
      dateMax: [''],
      numeroBE: [''],
      fournisseurId: [''],
      client: [''],
      origine: [''],
      responsable: [''],
      raisonSortie: [''],
      spl: [''],
      magasinId: [''],
      valeurBE: [''],
      etat: [''],
      facture: ['']
    });
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe((data: any) => {
      this.articles = data.articles || data;
    });
  }

  loadFournisseurs(): void {
    this.articleService.getAll().subscribe((data: any) => {
      this.fournisseurs = data.fournisseurs || [];
    });
  }

  loadMagasins(): void {
    this.stockService.getAll().subscribe((data: any) => {
      this.magasins = data.magasins || [];
    });
  }

  loadStocks(): void {
    this.stockService.getAll().subscribe((data: any) => {
      this.stocks = data;
    });
  }

  getAllSorties(): void {
    this.mouvementService.getSortiesTissu().subscribe((res: any) => {
      this.resultats = res.bonMouvements || res;
    });
  }

  rechercher(): void {
    const criteria = this.searchForm.value;
    this.mouvementService.rechercherSortiesTissu(criteria).subscribe((res: any) => {
      this.resultats = res.bonMouvements || res;
    });
  }

  annulerRecherche(): void {
    this.searchForm.reset();
    this.getAllSorties();
  }

  exportExcel(): void {
    this.exportService.exportToExcel(this.resultats, 'sorties-tissu');
  }

  exportPDF(): void {
    const headers = ['articleDesignation', 'entiteStockDesignation', 'quantite', 'date'];
    this.exportService.exportToPDF(headers, this.resultats, 'sorties-tissu');
  }
}
