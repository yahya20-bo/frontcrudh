import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stock-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './stock-layout.component.html',
  styleUrls: ['./stock-layout.component.scss'],

})
export class StockLayoutComponent {}
