import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

@Component({
  selector: 'app-ajout-entree-fourniture',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ajout-entree-fourniture.component.html',
  styleUrls: ['./ajout-entree-fourniture.component.scss']
})
export class AjoutEntreeFournitureComponent implements OnInit {
  form!: FormGroup;
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
    this.form = this.fb.group({
      articleId: ['', Validators.required],
      stockId: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      dateEntree: ['', Validators.required]
    });

    this.articleService.getAll().subscribe(res => this.articles = res.articles || res);
    this.stockService.getAll().subscribe(res => this.stocks = res);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = {
      articleId: this.form.value.articleId,
      stockId: this.form.value.stockId,
      quantite: this.form.value.quantite,
      dateMouvement: this.form.value.dateEntree
    };

    this.mouvementService.create('entrees/fourniture', payload).subscribe(() => {
      this.router.navigate(['/stock/entree-fourniture']);
    });
  }
}
