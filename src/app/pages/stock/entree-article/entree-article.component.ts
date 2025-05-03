import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService, Article } from 'src/app/services/article.service';

@Component({
  selector: 'app-entree-article',
  standalone: true,
  templateUrl: './entree-article.component.html',
  styleUrls: ['./entree-article.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EntreeArticleComponent implements OnInit {
  articles: Article[] = [];
  articleForm!: FormGroup;
  isLoading = false;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      libelle: ['', Validators.required],
      reference: ['', Validators.required]
    });

    this.getAllArticles();
  }

  getAllArticles() {
    this.isLoading = true;
    this.articleService.getAll().subscribe({
      next: (data: any) => {
        this.articles = data.results || data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.articleService.create(this.articleForm.value).subscribe(() => {
        this.articleForm.reset();
        this.getAllArticles();
      });
    }
  }

  deleteArticle(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.articleService.delete(id).subscribe(() => this.getAllArticles());
    }
  }
}
