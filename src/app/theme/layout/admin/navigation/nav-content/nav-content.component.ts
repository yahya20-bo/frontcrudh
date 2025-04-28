import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ On importe juste CommonModule
import { navItems } from '../navigation';        // ✅ ton code était bon ici

@Component({
  selector: 'app-nav-content',
  standalone: true,
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss'],
  imports: [
    CommonModule // ✅ Remplacer NgScrollbarModule par CommonModule
  ]
})
export class NavContentComponent {
  navItems = navItems;
}
