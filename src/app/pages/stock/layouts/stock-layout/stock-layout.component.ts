import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavLeftComponent } from 'src/app/theme/layout/admin/nav-bar/nav-left/nav-left.component'; // ✅ importe ta sidebar

@Component({
  selector: 'app-stock-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavLeftComponent // ✅ déclaration ici
  ],
  templateUrl: './stock-layout.component.html',
  styleUrls: ['./stock-layout.component.scss']
})
export class StockLayoutComponent {}
