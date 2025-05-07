import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

@Component({
  selector: 'app-ajout-entree-tissu',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './ajout-entree-tissu.component.html',
  styleUrls: ['./ajout-entree-tissu.component.scss']
})
export class AjoutEntreeTissuComponent implements OnInit {
  addForm!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private stockService: EntiteStockService,
    private bonMouvementService: BonMouvementService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      articleId: ['', Validators.required],
      entiteStockId: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required]
    });

    this.articleService.getAll().subscribe(result => {
      this.articles = result.articles;
    });

    this.stockService.getAll().subscribe(data => {
      this.stocks = data;
    });
  }

  ajouterEntree(): void {
    if (this.addForm.invalid) return;

    const formValue = this.addForm.value;

    const data = {
      articleId: formValue.articleId,
      entiteStockId: formValue.entiteStockId,
      quantite: formValue.quantite,
      date: formValue.date
    };

    this.bonMouvementService.ajouterEntreeTissu(data).subscribe(() => {
      alert("✅ Entrée tissu ajoutée avec succès !");
      this.addForm.reset();
    });
  }
}
