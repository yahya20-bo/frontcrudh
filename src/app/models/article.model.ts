export interface Article {
  id: number;
  ref?: string;
  reference?: string;
  designation: string;
  prixUnitaire?: number;
  pmp?: number;
  tva?: number;
  besoin?: number;
  poidsBrut?: number;
  dateCreation?: string;
  blSuppression?: boolean;

  client?: string;
  numeroBe?: string;
  responsable?: string;
  origine?: string;
  valeurBe?: string;
  raisonEntree?: string;
  spl?: string;
  magasin?: { id: number; nom: string };
  daeFacture?: string;
  etat?: string;
  fournisseur?: { id: number; nom: string };
}
