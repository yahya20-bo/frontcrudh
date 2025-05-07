import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

@Component({
  selector: 'app-sortie-divers',
  standalone: true,
  templateUrl: './sortie-divers.component.html',
  styleUrls: ['./sortie-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class SortieDiversComponent implements OnInit {
  searchForm!: FormGroup;
  articles: any[] = [];
  mouvements: any[] = [];
  fournisseurs: any[] = [];
  stocks: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService
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
      magasin: ['']
    });

    this.loadArticles();
    this.loadStocks();
    this.loadFournisseurs();
    this.getAll();
  }

  loadArticles() {
    this.articleService.getAll().subscribe(res => {
      this.articles = res.articles || res;
    });
  }

  loadStocks() {
    this.stockService.getAll().subscribe(res => {
      this.stocks = res;
    });
  }

  loadFournisseurs() {
    this.articleService.getFournisseurs().subscribe((data: any) => {
      this.fournisseurs = data;
    });
  }

  getAll() {
    this.mouvementService.getAll('sorties/divers').subscribe(data => this.mouvements = data);
  }

  onSearch() {
    const params = this.searchForm.value;
    this.mouvementService.search('sorties/divers', params).subscribe(data => this.mouvements = data);
  }

  resetSearch() {
    this.searchForm.reset();
    this.getAll();
  }
}
