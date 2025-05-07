import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BonMouvementService } from 'src/app/services/bon-mouvement.service';
import { ArticleService } from 'src/app/services/article.service';
import { EntiteStockService } from 'src/app/services/entite-stock.service';

@Component({
  selector: 'app-ajout-sortie-tissu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ajout-sortie-tissu.component.html',
  styleUrls: ['./ajout-sortie-tissu.component.scss']
})
export class AjoutSortieTissuComponent implements OnInit {
  addForm!: FormGroup;
  articles: any[] = [];
  stocks: any[] = [];

  constructor(
    private fb: FormBuilder,
    private bonMouvementService: BonMouvementService,
    private articleService: ArticleService,
    private stockService: EntiteStockService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      articleId: ['', Validators.required],
      entiteStockId: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required]
    });

    this.articleService.getAll().subscribe((res: any) => {
      this.articles = res.articles || res;
    });

    this.stockService.getAll().subscribe((res: any) => {
      this.stocks = res;
    });
  }

  ajouter(): void {
    if (this.addForm.invalid) return;
    const payload = this.addForm.value;

    this.bonMouvementService.ajouterSortieTissu(payload).subscribe(() => {
      alert('✅ Sortie tissu ajoutée avec succès');
      this.addForm.reset();
    });
  }
}
