import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

@Component({
  selector: 'app-ajout-entree-divers',
  standalone: true,
  templateUrl: './ajout-entree-divers.component.html',
  styleUrls: ['./ajout-entree-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AjoutEntreeDiversComponent implements OnInit {
  addForm!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private mouvementService: BonMouvementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      articleId: ['', Validators.required],
      stockId: ['', Validators.required],
      quantite: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.articleService.getAll().subscribe((data: any) => this.articles = data.articles);
    this.stockService.getAll().subscribe((data: any) => this.stocks = data);
  }

  onSubmit() {
    if (this.addForm.invalid) return;

    const payload = {
      articleId: this.addForm.value.articleId,
      stockId: this.addForm.value.stockId,
      quantite: this.addForm.value.quantite,
      dateMouvement: this.addForm.value.date
    };

    this.mouvementService.create('entrees/divers', payload).subscribe(() => {
      this.router.navigate(['/stock/entree-divers']);
    });
  }
}
