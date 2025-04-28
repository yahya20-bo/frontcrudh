// Angular imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Project imports
import { ConfigurationComponent } from './configuration/configuration.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ConfigurationComponent,
    NavBarComponent,
    NavigationComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  navCollapsed;
  navCollapsedMob: boolean;
  windowWidth: number;

  constructor() {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  navMobClick() {
    if (
      this.navCollapsedMob &&
      !document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')
    ) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    const nav = document.querySelector('app-navigation.pcoded-navbar');
    if (nav?.classList.contains('mob-open')) {
      nav.classList.remove('mob-open');
    }
  }
}
