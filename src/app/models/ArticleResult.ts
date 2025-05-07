import { Article } from "./article.model";

export interface ArticleResult {
    articles: Article[]; // Liste des articles
    totalResults: number; // Nombre total d'articles
  }
  