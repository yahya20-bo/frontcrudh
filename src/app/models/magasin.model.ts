import { Site } from './site.model';

export interface Magasin {
  id?: number;
  designation?: string;
  siteEntite?: Site;
  blSuppression?: boolean;
  dateCreation?: Date;
  dateModification?: Date;
  dateSuppression?: Date;
  tissue?: boolean;
  fourniture?: boolean;
  actif?: boolean;
  idClient?: number;
  divers?: boolean;
  inputEmplacementTissu?: boolean;
  inputEmplacement?: boolean;
}

// ✅ Ajoute ce modèle pour la réponse du backend
export interface MagasinResponse {
  magasins: Magasin[];
  totalResults: number;
}
