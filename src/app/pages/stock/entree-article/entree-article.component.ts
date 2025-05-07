import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { ArticleResult } from 'src/app/models/ArticleResult';

@Component({
  selector: 'app-entree-article',
  standalone: true,
  templateUrl: './entree-article.component.html',
  styleUrls: ['./entree-article.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EntreeArticleComponent implements OnInit {
  articles: Article[] = [];
  articleForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      ref: ['', Validators.required],
      designation: ['', Validators.required]
    });

    this.loadArticles();
  }

  loadArticles() {
    this.isLoading = true;
    this.articleService.getAll().subscribe({
      next: (response :ArticleResult) => {
        this.articles = response.articles;

        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.articleService.create(this.articleForm.value).subscribe(() => {
        this.articleForm.reset();
        this.loadArticles();
      });
    }
  }

  deleteArticle(id: number) {
    if (confirm('Supprimer cet article ?')) {
      this.articleService.delete(id).subscribe(() => this.loadArticles());
    }
  }
}
