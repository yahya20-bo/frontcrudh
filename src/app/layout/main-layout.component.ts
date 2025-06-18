import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// ✅ Corrige le chemin exact selon ton projet
import { NavBarComponent } from '../theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from '../theme/layout/admin/navigation/navigation.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent,
    NavigationComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {}
