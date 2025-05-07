export interface Article {
    id?: number;
    ref: string;
    designation: string;
    prixUnitaire?: number;
    pmp?: number;
    tva?: number;
    besoin?: number;
    poidsBrut?: number;
    dateCreation?: string;
    blSuppression?: boolean;
  }
  