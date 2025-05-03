import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

@Component({
  selector: 'app-entree-divers',
  standalone: true,
  templateUrl: './entree-divers.component.html',
  styleUrls: ['./entree-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EntreeDiversComponent implements OnInit {
  articles: any[] = [];
  stocks: any[] = [];
  mouvements: any[] = [];

  searchForm!: FormGroup;
  ajoutForm!: FormGroup;

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
      dateFin: ['']
    });

    this.ajoutForm = this.fb.group({
      articleId: ['', Validators.required],
      stockId: ['', Validators.required],
      quantite: ['', Validators.required],
      dateEntree: ['', Validators.required]
    });

    this.loadData();
  }

  loadData() {
    this.articleService.getAll().subscribe(data => this.articles = data);
    this.stockService.getAll().subscribe(data => this.stocks = data);
    this.getAllMouvements();
  }

  getAllMouvements() {
    this.mouvementService.getAll('entrees/divers').subscribe(data => this.mouvements = data);
  }

  onSearch() {
    const params = this.searchForm.value;
    this.mouvementService.search('entrees/divers', params).subscribe(data => this.mouvements = data);
  }

  onAdd() {
    if (this.ajoutForm.invalid) return;
    const formData = this.ajoutForm.value;
    const payload = {
      articleId: formData.articleId,
      stockId: formData.stockId,
      quantite: formData.quantite,
      dateMouvement: formData.dateEntree
    };
    this.mouvementService.create('entrees/divers', payload).subscribe(() => {
      this.ajoutForm.reset();
      this.getAllMouvements();
    });
  }
}
