// src/app/models/resultat-sortie-fourniture.model.ts
export interface ResultatSortieFourniture {
  produitId: number;
  entiteStockId: number;      // ← Stock concerné
  clientId: number;           // ← Client qui reçoit
  numeroBE: string;           // ← Numéro de Bon de Sortie
  origine: string;
  responsable: string;
  motif: string;
  spl: string;
  valeurBS: number;           // ← Valeur de sortie
  etat: string;
  resultatQte: number;        // ← Quantité calculée ou saisie
  reference: string;
  designation: string;
  quantite: number;
  entiteStock: string;
  date: string;               // ← Format ISO ou yyyy-MM-dd
}
