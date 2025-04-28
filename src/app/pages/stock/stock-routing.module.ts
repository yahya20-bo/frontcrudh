import { Routes } from '@angular/router';

// Composants standalone
import { EntreeTissuComponent } from './entree-tissu/entree-tissu.component';
import { SortieTissuComponent } from './sortie-tissu/sortie-tissu.component';
import { EtatStockComponent } from './etat-stock/etat-stock.component';
import { FournitureComponent } from './fourniture/fourniture.component';
import { DiversComponent } from './divers/divers.component';
import { RlxComponent } from './rlx/rlx.component';

export const stockRoutes: Routes = [
  { path: 'entree-tissu', component: EntreeTissuComponent },
  { path: 'sortie-tissu', component: SortieTissuComponent },
  { path: 'etat-stock', component: EtatStockComponent },
  { path: 'fourniture', component: FournitureComponent },
  { path: 'divers', component: DiversComponent },
  { path: 'rlx', component: RlxComponent },
  { path: '', redirectTo: 'entree-tissu', pathMatch: 'full' } // redirige par défaut
];
