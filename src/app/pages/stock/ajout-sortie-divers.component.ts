import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

@Component({
  selector: 'app-ajout-sortie-divers',
  standalone: true,
  templateUrl: './ajout-sortie-divers.component.html',
  styleUrls: ['./ajout-sortie-divers.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AjoutSortieDiversComponent implements OnInit {
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
      dateMouvement: ['', Validators.required]
    });

    this.articleService.getAll().subscribe(data => this.articles = data.articles || data);
    this.stockService.getAll().subscribe(data => this.stocks = data);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.mouvementService.create('sorties/divers', this.form.value).subscribe(() => {
      this.router.navigate(['/stock/sortie-divers']);
    });
  }
}
