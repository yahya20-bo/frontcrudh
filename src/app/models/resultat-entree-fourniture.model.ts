// src/app/models/resultat-entree-fourniture.model.ts
export interface ResultatEntreeFourniture {
    produitId: number;
  entiteStockId: number; // ← ce champ est requis !
  fournisseurId: number;    
  clientId: number;
  numeroBE: string;
  origine: string;
  responsable: string;
  motif: string;
  spl: string;
  valeurBE: number;
  etat: string;
  resultatQte: number;
  reference: string;
  designation: string;
  quantite: number;
  entiteStock: string;
  date: string;
  
}
