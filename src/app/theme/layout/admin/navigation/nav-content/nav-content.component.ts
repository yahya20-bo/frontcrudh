import { Component } from '@angular/core';
import { navItems } from '../navigation'; // ✅ Corrigé ici

@Component({
  selector: 'app-nav-content',
  standalone: true,
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss'],
})
export class NavContentComponent {
  navItems = navItems;
}
