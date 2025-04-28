import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { stockRoutes } from './stock-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(stockRoutes)
  ]
})
export class StockModule {}
