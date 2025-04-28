// src/app/pages/stock/stock.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { stockRoutes } from './stock-routing.module';

@NgModule({
  imports: [RouterModule.forChild(stockRoutes)],
})
export class StockModule {}
