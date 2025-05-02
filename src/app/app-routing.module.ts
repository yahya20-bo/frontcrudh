import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'stock/entree-tissu', pathMatch: 'full' },

  { path: 'stock/entree-tissu', loadComponent: () => import('./pages/stock/entree-tissu/entree-tissu.component').then(m => m.EntreeTissuComponent) },
  { path: 'stock/sortie-tissu', loadComponent: () => import('./pages/stock/sortie-tissu/sortie-tissu.component').then(m => m.SortieTissuComponent) },
  { path: 'stock/etat-stock-tissu', loadComponent: () => import('./pages/stock/etat-stock-tissu/etat-stock-tissu.component').then(m => m.EtatStockTissuComponent) },

  { path: 'stock/entree-fourniture', loadComponent: () => import('./pages/stock/entree-fourniture/entree-fourniture.component').then(m => m.EntreeFournitureComponent) },
  { path: 'stock/sortie-fourniture', loadComponent: () => import('./pages/stock/sortie-fourniture/sortie-fourniture.component').then(m => m.SortieFournitureComponent) },
  { path: 'stock/etat-stock-fourniture', loadComponent: () => import('./pages/stock/etat-stock-fourniture/etat-stock-fourniture.component').then(m => m.EtatStockFournitureComponent) },

  { path: 'stock/entree-divers', loadComponent: () => import('./pages/stock/entree-divers/entree-divers.component').then(m => m.EntreeDiversComponent) },
  { path: 'stock/sortie-divers', loadComponent: () => import('./pages/stock/sortie-divers/sortie-divers.component').then(m => m.SortieDiversComponent) },
  { path: 'stock/etat-stock-divers', loadComponent: () => import('./pages/stock/etat-stock-divers/etat-stock-divers.component').then(m => m.EtatStockDiversComponent) },

  { path: 'stock/entree-article', loadComponent: () => import('./pages/stock/entree-article/entree-article.component').then(m => m.EntreeArticleComponent) }
];