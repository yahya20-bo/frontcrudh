import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { stockRoutes } from './stock-routing.module';

// Importer tous tes composants standalone ici :
import { EntreeTissuComponent } from './entree-tissu/entree-tissu.component';
import { SortieTissuComponent } from './sortie-tissu/sortie-tissu.component';
import { EtatStockComponent } from './etat-stock/etat-stock.component';
import { RlxComponent } from './rlx/rlx.component';
import { FournitureComponent } from './fourniture/fourniture.component';
import { DiversComponent } from './divers/divers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(stockRoutes)
  ],
  declarations: [], // composants standalone → pas besoin ici
})
export class StockModule {}
