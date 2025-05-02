import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavRightComponent } from './nav-right/nav-right.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavLeftComponent,
    NavRightComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  navCollapsedMob = false;
  headerStyle = '';
  menuClass = false;
  collapseStyle = 'none';

  toggleMobOption(): void {
    this.menuClass = !this.menuClass;
    this.headerStyle = this.menuClass ? 'none' : '';
    this.collapseStyle = this.menuClass ? 'block' : 'none';
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(): void {
    this.closeMenu();
  }

  closeMenu(): void {
    document.querySelector('app-navigation.pcoded-navbar')?.classList.remove('mob-open');
  }
}