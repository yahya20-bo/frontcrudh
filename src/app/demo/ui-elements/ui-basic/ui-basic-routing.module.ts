import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'basic-badge',
    loadComponent: () => import('./basic-badge/basic-badge.component').then(m => m.BasicBadgeComponent)
  },
  {
    path: 'basic-button',
    loadComponent: () => import('./basic-button/basic-button.component').then(m => m.BasicButtonComponent)
  },
  {
    path: 'basic-typography',
    loadComponent: () => import('./basic-typography/basic-typography.component').then(m => m.BasicTypographyComponent)
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule {}
