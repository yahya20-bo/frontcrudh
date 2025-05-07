import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';

@Component({
  selector: 'app-ajout-sortie-fourniture',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ajout-sortie-fourniture.component.html',
  styleUrls: ['./ajout-sortie-fourniture.component.scss']
})
export class AjoutSortieFournitureComponent implements OnInit {
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
      dateSortie: ['', Validators.required]
    });

    this.articleService.getAll().subscribe(data => this.articles = data.articles);
    this.stockService.getAll().subscribe(data => this.stocks = data);
  }

  onSubmit(): void {
    if (this.addForm.invalid) return;

    const form = this.addForm.value;
    const payload = {
      articleId: form.articleId,
      stockId: form.stockId,
      quantite: form.quantite,
      dateMouvement: form.dateSortie
    };

    this.mouvementService.create('sorties/fourniture', payload).subscribe(() => {
      this.router.navigate(['/stock/sortie-fourniture']);
    });
  }
}
