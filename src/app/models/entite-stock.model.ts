import { Article } from './article.model';

export interface EntiteStock {
  nom: string;                             // ✅ requis pour getMagasinNom et getMagasinId
  id?: number;
  libelleArticle?: string;
  referenceArticle?: string;
  dateEntree?: Date;
  emplacement?: string;
  blSuppression?: boolean;
  article?: Article;                       // ✅ si vous affichez info article (libelle, réf...)
}
