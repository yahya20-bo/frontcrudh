import { Site } from './site.model'; // ✅ Ajoute cette ligne

export interface Magasin {
  id?: number;
  designation?: string;
  siteEntite?: Site; // ✅ Site utilisé ici
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
