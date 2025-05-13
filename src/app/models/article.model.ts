export interface Article {
  id: number;
  article: Article;
  stock: { id: number; nom: string };
  quantite: number;
  date: string;
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
   designation: string; // ✅ c’est ce champ qu'on utilise dans le HTML
  reference?: string;
}
