import { Article } from './article.model';

export interface EntiteStockResult {
  id: number;
  libelleArticle: string;
  referenceArticle: string;
  dateEntree: Date;
  emplacement: string;
  blSuppression: boolean;
  article: Article;
}
