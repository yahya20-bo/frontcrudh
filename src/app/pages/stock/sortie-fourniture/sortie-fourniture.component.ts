import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-sortie-fourniture',
  templateUrl: './sortie-fourniture.component.html',
  styleUrls: ['./sortie-fourniture.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class SortieFournitureComponent implements OnInit {
  articles: any[] = [];
  stocks: any[] = [];
  mouvements: any[] = [];
  fournisseurs: any[] = [];
  magasins: any[] = [];

  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      ref: [''],
      designation: [''],
      dateDebut: [''],
      dateFin: [''],
      fournisseur: [''],
      magasin: [''],
      numeroBE: [''],
      client: [''],
      origine: [''],
      responsable: [''],
      raison: [''],
      spl: [''],
      etat: [''],
      facture: [''],
      valeurBE: ['']
    });
  }

  loadData(): void {
    this.articleService.getAll().subscribe(data => {
      this.articles = data.articles || [];
    });

    this.stockService.getAll().subscribe(data => {
      this.stocks = data || [];
      this.magasins = data.magasins || [];
    });

    this.getAllMouvements();
  }

  getAllMouvements(): void {
    this.mouvementService.getAll('sorties/fourniture').subscribe(data => {
      this.mouvements = data || [];
    });
  }

  onSearch(): void {
    const params = this.searchForm.value;
    this.mouvementService.search('sorties/fourniture', params).subscribe(data => {
      this.mouvements = data || [];
    });
  }

  onReset(): void {
    this.searchForm.reset();
    this.getAllMouvements();
  }

  exportExcel(): void {
    this.exportService.exportToExcel(this.mouvements, 'sorties-fourniture');
  }

  exportPDF(): void {
    const headers = ['article.ref', 'article.designation', 'quantite', 'entiteStock.nom', 'dateMouvement'];
    const mapped = this.mouvements.map((m: any) => ({
      'article.ref': m.article?.ref,
      'article.designation': m.article?.designation,
      'quantite': m.quantite,
      'entiteStock.nom': m.entiteStock?.nom,
      'dateMouvement': m.dateMouvement
    }));
    this.exportService.exportToPDF(headers, mapped, 'sorties-fourniture');
  }
}
