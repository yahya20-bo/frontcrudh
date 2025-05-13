import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'stock/entree-tissu', pathMatch: 'full' },

  // TISSU
  {
    path: 'stock/entree-tissu',
    loadComponent: () =>
      import('./pages/stock/entree-tissu/entree-tissu.component').then(m => m.EntreeTissuComponent)
  },
  {
    path: 'stock/sortie-tissu',
    loadComponent: () =>
      import('./pages/stock/sortie-tissu/sortie-tissu.component').then(m => m.SortieTissuComponent)
  },
  {
    path: 'stock/etat-stock-tissu',
    loadComponent: () =>
      import('./pages/stock/etat-stock-tissu/etat-stock-tissu.component').then(m => m.EtatStockTissuComponent)
  },

  // FOURNITURE
  {
    path: 'stock/entree-fourniture',
    loadComponent: () =>
      import('./pages/stock/entree-fourniture/entree-fourniture.component').then(m => m.EntreeFournitureComponent)
  },
  {
    path: 'stock/sortie-fourniture',
    loadComponent: () =>
      import('./pages/stock/sortie-fourniture/sortie-fourniture.component').then(m => m.SortieFournitureComponent)
  },
  {
    path: 'stock/etat-stock-fourniture',
    loadComponent: () =>
      import('./pages/stock/etat-stock-fourniture/etat-stock-fourniture.component').then(m => m.EtatStockFournitureComponent)
  },

  // DIVERS
  {
    path: 'stock/entree-divers',
    loadComponent: () =>
      import('./pages/stock/entree-divers/entree-divers.component').then(m => m.EntreeDiversComponent)
  },
  {
    path: 'stock/sortie-divers',
    loadComponent: () =>
      import('./pages/stock/sortie-divers/sortie-divers.component').then(m => m.SortieDiversComponent)
  },
  {
    path: 'stock/etat-stock-divers',
    loadComponent: () =>
      import('./pages/stock/etat-stock-divers/etat-stock-divers.component').then(m => m.EtatStockDiversComponent)
  },

  // ARTICLE
  {
    path: 'stock/entree-article',
    loadComponent: () =>
      import('./pages/stock/entree-article/entree-article.component').then(m => m.EntreeArticleComponent)
  },
  {
    path: 'stock/article',
    loadComponent: () =>
      import('./pages/stock/article/article.component').then(m => m.ArticleComponent)
  },
  {
  path: 'stock/sortie-article',
  loadComponent: () =>
    import('./pages/stock/sortie-article/sortie-article.component').then(m => m.SortieArticleComponent)
},
  
{
  path: 'stock/etat-stock-article',  // ✅ nouvel ajout ici
  loadComponent: () =>
    import('./pages/stock/etat-stock-article/etat-stock-article.component').then(m => m.EtatStockArticleComponent)
},
  // AJOUT
  {
    path: 'ajout-entree-tissu',
    loadComponent: () =>
      import('./pages/stock/ajout-entree-tissu.component').then(m => m.AjoutEntreeTissuComponent)
  },
  {
    path: 'ajout-sortie-tissu',
    loadComponent: () =>
      import('./pages/stock/ajout-sortie-tissu/ajout-sortie-tissu.component').then(m => m.AjoutSortieTissuComponent)
  },
  {
    path: 'ajout-entree-fourniture',
    loadComponent: () =>
      import('./pages/stock/ajout-entree-fourniture/ajout-entree-fourniture.component').then(m => m.AjoutEntreeFournitureComponent)
  },
  {
    path: 'ajout-sortie-fourniture',
    loadComponent: () =>
      import('./pages/stock/ajout-sortie-fourniture.component').then(m => m.AjoutSortieFournitureComponent)
  },
  {
    path: 'ajout-entree-divers',
    loadComponent: () =>
      import('./pages/stock/ajout-entree-divers.component').then(m => m.AjoutEntreeDiversComponent)
  },
  {
    path: 'ajout-sortie-divers',
    loadComponent: () =>
      import('./pages/stock/ajout-sortie-divers.component').then(m => m.AjoutSortieDiversComponent)
  },
// AJOUT
{
  path: 'ajout-entree-article',
  loadComponent: () =>
    import('./pages/stock/ajout-entree-article/ajout-entree-article.component').then(m => m.AjoutEntreeArticleComponent)
},
{
  path: 'ajout-sortie-article',
  loadComponent: () =>
    import('./pages/stock/ajout-sortie-article/ajout-sortie-article.component').then(m => m.AjoutSortieArticleComponent)
},

  // CHATBOT
  {
    path: 'chatbot',
    loadComponent: () =>
      import('./chatbot/chatbot.component').then(m => m.ChatbotComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
