import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  standalone: true,
  selector: 'app-entree-article',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './entree-article.component.html',
  styleUrls: ['./entree-article.component.scss']
})
export class EntreeArticleComponent implements OnInit {
  articles: any[] = [];
  loading = false;
  error = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.loading = true;
    this.articleService.getAll().subscribe({
      next: (response: any) => {
        this.articles = response.articles || [];
        this.loading = false;
      },
      error: () => {
        this.error = "❌ Erreur de chargement des articles.";
        this.loading = false;
      }
    });
  }
}
