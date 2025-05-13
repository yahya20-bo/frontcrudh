import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { stockRoutes } from './stock-routing.module';

// Import des composants standalone
import { EntreeTissuComponent } from './entree-tissu/entree-tissu.component';
import { SortieTissuComponent } from './sortie-tissu/sortie-tissu.component';
import { EtatStockComponent } from './etat-stock/etat-stock.component';
import { RlxComponent } from './rlx/rlx.component';
import { FournitureComponent } from './fourniture/fourniture.component';
import { DiversComponent } from './divers/divers.component';
import { EntreeArticleComponent } from './entree-article/entree-article.component';  // Composant standalone
import { AjoutEntreeArticleComponent } from './ajout-entree-article/ajout-entree-article.component';  // Composant standalone

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(stockRoutes) // RouterModule avec forChild pour module enfant
  ],
  declarations: [
    // Aucun besoin de déclarer les composants standalone ici.
  ],
  providers: []  // Si nécessaire, ajoutez ici des services à injecter dans le module
})
export class StockModule {}
