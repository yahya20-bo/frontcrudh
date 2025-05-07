import { TypeArticle } from './type-article.model';

export interface FamilleArticleResult {
  id: number;
  designation: string;
  blSuppression: boolean;
  dateSuppression: Date;
  dateCreation: Date;
  dateModification: Date;
  typeArticle: TypeArticle;
  nature: string;
  idClient: number;
  achat: string;
  idGenrateur: number;
  code: string;
  generationCode: boolean;
}
