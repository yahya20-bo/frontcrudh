import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-entree-divers',
  standalone: true,
  templateUrl: './entree-divers.component.html',
  styleUrls: ['./entree-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class EntreeDiversComponent implements OnInit {
  articles: any[] = [];
  stocks: any[] = [];
  fournisseurs: any[] = [];
  mouvements: any[] = [];
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      ref: [''],
      designation: [''],
      dateDebut: [''],
      dateFin: [''],
      responsable: [''],
      spl: [''],
      origine: [''],
      raison: [''],
      fournisseur: [''],
      magasin: [''],
      numeroBE: [''],
      client: [''],
      etat: [''],
      facture: [''],
      valeurBE: ['']
    });

    this.loadData();
  }

  loadData(): void {
   this.articleService.getAll().subscribe((data: any) => {
  this.articles = Array.isArray(data) ? data : data.articles || [];
});

    this.stockService.getAll().subscribe(data => {
      this.stocks = data || [];
    });

    this.articleService.getFournisseurs().subscribe((data: any[]) => {
      this.fournisseurs = data;
    });

    this.getAll();
  }

  getAll(): void {
    this.mouvementService.getAll('entrees/divers').subscribe(data => {
      this.mouvements = data || [];
    });
  }

  onSearch(): void {
    const params = this.searchForm.value;
    this.mouvementService.search('entrees/divers', params).subscribe(data => {
      this.mouvements = data || [];
    });
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.getAll();
  }

  exportExcel(): void {
    this.exportService.exportToExcel(this.mouvements, 'entrees-divers');
  }

  exportPDF(): void {
    const headers = ['article.ref', 'article.designation', 'quantite', 'entiteStock.nom', 'dateMouvement'];
    const data = this.mouvements.map((m: any) => ({
      'article.ref': m.article?.ref,
      'article.designation': m.article?.designation,
      'quantite': m.quantite,
      'entiteStock.nom': m.entiteStock?.nom,
      'dateMouvement': m.dateMouvement
    }));
    this.exportService.exportToPDF(headers, data, 'entrees-divers');
  }
}
