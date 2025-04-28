// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    CardComponent // Car CardComponent est standalone
  ],
  exports: [
    CommonModule,
    CardComponent
  ]
})
export class SharedModule {}
