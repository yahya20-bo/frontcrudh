// Angular imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavContentComponent } from './nav-content/nav-content.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [CommonModule, SharedModule, NavLogoComponent, NavContentComponent] // Ajout correct de NavContentComponent ici
})
export class NavigationComponent {
  navCollapsed = false;
  navCollapsedMob = false;
  windowWidth = window.innerWidth;

  constructor() {}

  navCollapse() {
    if (this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }
}
