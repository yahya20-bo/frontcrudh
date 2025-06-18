import { Article } from './article.model';

export interface ArticleResult {
  articles: Article[];
  totalResults: number;
}
