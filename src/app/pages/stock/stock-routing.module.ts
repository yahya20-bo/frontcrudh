import { Routes } from '@angular/router';

// Layout principal
import { StockLayoutComponent } from './layouts/stock-layout/stock-layout.component';

// Tissu
import { EntreeTissuComponent } from './entree-tissu/entree-tissu.component';
import { SortieTissuComponent } from './sortie-tissu/sortie-tissu.component';
import { EtatStockTissuComponent } from './etat-stock-tissu/etat-stock-tissu.component';

// Fourniture
import { EntreeFournitureComponent } from './entree-fourniture/entree-fourniture.component';
import { SortieFournitureComponent } from './sortie-fourniture/sortie-fourniture.component';
import { EtatStockFournitureComponent } from './etat-stock-fourniture/etat-stock-fourniture.component';

// Divers
import { EntreeDiversComponent } from './entree-divers/entree-divers.component';
import { SortieDiversComponent } from './sortie-divers/sortie-divers.component';
import { EtatStockDiversComponent } from './etat-stock-divers/etat-stock-divers.component';

// Article (chargement paresseux)
export const stockRoutes: Routes = [
  {
    path: '',
    component: StockLayoutComponent,
    children: [
      // Tissu
      { path: 'entree-tissu', component: EntreeTissuComponent },
      { path: 'sortie-tissu', component: SortieTissuComponent },
      { path: 'etat-stock-tissu', component: EtatStockTissuComponent },

      // Fourniture
      { path: 'entree-fourniture', component: EntreeFournitureComponent },
      { path: 'sortie-fourniture', component: SortieFournitureComponent },
      { path: 'etat-stock-fourniture', component: EtatStockFournitureComponent },

      // Divers
      { path: 'entree-divers', component: EntreeDiversComponent },
      { path: 'sortie-divers', component: SortieDiversComponent },
      { path: 'etat-stock-divers', component: EtatStockDiversComponent },

       // ✅ Article (Entrée / Sortie / État Actuel)
      {
        path: 'entree-article',
        loadComponent: () =>
          import('./entree-article/entree-article.component').then(m => m.EntreeArticleComponent)
      },
      {
        path: 'sortie-article',
        loadComponent: () =>
          import('./sortie-article/sortie-article.component').then(m => m.SortieArticleComponent)
      },
      {
        path: 'etat-stock-article',
        loadComponent: () =>
          import('./etat-stock-article/etat-stock-article.component').then(m => m.EtatStockArticleComponent)
      }
    ]
  }
];
