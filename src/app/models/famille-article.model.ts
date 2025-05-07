import { TypeArticle } from './type-article.model';

export interface FamilleArticle {
  id?: number;
  designation?: string;
  blSuppression?: boolean;
  dateSuppression?: Date;
  dateCreation?: Date;
  dateModification?: Date;
  typeArticle?: TypeArticle;
  nature?: string;
  idClient?: number;
  achat?: string;
  idGenrateur?: number;
  code?: string;
  generationCode?: boolean;
}
