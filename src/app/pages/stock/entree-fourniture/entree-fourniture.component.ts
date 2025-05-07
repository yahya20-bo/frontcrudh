import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

@Component({
  selector: 'app-entree-fourniture',
  standalone: true,
  templateUrl: './entree-fourniture.component.html',
  styleUrls: ['./entree-fourniture.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class EntreeFournitureComponent implements OnInit {
  articles: any[] = [];
  fournisseurs: any[] = [];
  stocks: any[] = [];
  magasins: any[] = [];
  mouvements: any[] = [];

  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadData();
  }

  initForms(): void {
    this.searchForm = this.fb.group({
      ref: [''],
      designation: [''],
      dateDebut: [''],
      dateFin: [''],
      fournisseur: [''],
      magasin: ['']
    });
  }

  loadData(): void {
    this.articleService.getAll().subscribe((data: any) => {
      this.articles = data.articles || data;
    });

    this.articleService.getFournisseurs().subscribe((data: any[]) => {
      this.fournisseurs = data;
    });

    this.stockService.getAll().subscribe((data: any) => {
      this.stocks = data;
      this.magasins = data.magasins || [];
    });

    this.getAllMouvements();
  }

  getAllMouvements(): void {
    this.mouvementService.getAll('entrees/fourniture').subscribe((data: any[]) => {
      this.mouvements = data;
    });
  }

  onSearch(): void {
    const params = this.searchForm.value;
    this.mouvementService.search('entrees/fourniture', params).subscribe((data: any[]) => {
      this.mouvements = data;
    });
  }

  onReset(): void {
    this.searchForm.reset();
    this.getAllMouvements();
  }
}
