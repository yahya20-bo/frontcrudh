export interface EntreeArticleResult {
  articleId: number;
  articleDesignation: string;
  ref?: string;
  reference?: string;
  prixUnitaire?: number;
  poidsBrut?: number;
  pmp?: number;
  besoin?: number;
  tva?: number;
  date: string;

  entiteStockDesignation?: string;
  quantite?: number;

  fournisseurNom?: string;
  client?: string;
  origine?: string;
  responsable?: string;
  raisonEntree?: string;
  valeurBE?: number;
  etat?: string;
  spl?: string;
}
