// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./demo/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },

      // UI Elements
      {
        path: 'basic',
        loadChildren: () =>
          import('./demo/ui-elements/ui-basic/ui-basic.module').then(m => m.UiBasicModule)
      },

      // Form Elements
      {
        path: 'forms',
        loadChildren: () =>
          import('./demo/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },

      // Tables
      {
        path: 'tables',
        loadChildren: () =>
          import('./demo/pages/tables/tables.module').then(m => m.TablesModule)
      },

      // Apex Charts
      {
        path: 'apexchart',
        loadComponent: () =>
          import('./demo/pages/core-chart/apex-chart/apex-chart.component').then(m => m.ApexChartComponent)
      },

      // Sample Page
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/extra/sample-page/sample-page.component').then(m => m.SamplePageComponent)
      },

      // Stock (Gestion de stock module)
      {
        path: 'stock',
        loadChildren: () =>
          import('./pages/stock/stock.module').then(m => m.StockModule)
      }
    ]
  },
  {
    path: 'auth', // correction ici !
    component: GuestComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },

  // 404 - Redirection
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
