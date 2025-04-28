import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { BreadcrumbsComponent } from 'src/app/theme/shared/components/breadcrumbs/breadcrumbs.component';
import { NavigationComponent } from 'src/app/theme/layout/admin/navigation/navigation.component';
import { NavBarComponent } from 'src/app/theme/layout/admin/nav-bar/nav-bar.component';
import { ConfigurationComponent } from 'src/app/theme/layout/admin/configuration/configuration.component';
import { NavLogoComponent } from 'src/app/theme/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavContentComponent } from 'src/app/theme/layout/admin/navigation/nav-content/nav-content.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [
    RouterOutlet,
    NgClass,
    BreadcrumbsComponent,
    NavigationComponent,
    NavBarComponent,
    ConfigurationComponent,
    NavLogoComponent,
    NavContentComponent
  ]
})
export class AdminComponent {
  navCollapsed = false;
  navCollapsedMob = false;

  navMobClick() {
    this.navCollapsedMob = !this.navCollapsedMob;
  }

  closeMenu() {
    this.navCollapsedMob = false;
  }

  toggleNavCollapsed() {
    this.navCollapsed = !this.navCollapsed;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }
}
