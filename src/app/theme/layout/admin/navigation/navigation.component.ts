import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <<< AJOUTÉ pour ngClass
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavContentComponent } from './nav-content/nav-content.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavItemComponent } from './nav-item/nav-item.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [
    CommonModule, // <<< AJOUTÉ
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent
  ],
})
export class NavigationComponent {
  public navCollapsed: boolean = true;

  toggleNavCollapse() {
    this.navCollapsed = !this.navCollapsed;
  }

  navCollapseMob() {
    this.navCollapsed = !this.navCollapsed;
  }
}
