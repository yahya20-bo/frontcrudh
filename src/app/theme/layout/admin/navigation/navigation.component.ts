import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { navItems } from './navigation';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AuthService],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public navItems = navItems;

  constructor(private router: Router , public authService: AuthService) {}

  isLoginPage(): boolean {
    return this.router.url === '/login'; // Vérifie si l'URL actuelle est la page de login
  }

  logout(): void {
    localStorage.removeItem('token');         // ⛔ Supprime le JWT
    this.router.navigate(['/login']);         // 🔁 Redirige vers la page de login
  }
 shouldDisplay(item: any): boolean {
  const url = item.url || '';
  const name = item.name.toLowerCase();

  // Always visible
  if (!url || name.includes('chatbot') || name.includes('se déconnecter')) return true;
  if ( this.router.url === '/admin/home' || this.router.url === '/admin/manage-personal-admins') return false;
  if (url.includes('tissu')) {
    return this.authService.isTissuUser() || this.authService.isAdmin();
  }

  if (url.includes('fourniture')) {
    return this.authService.isFournitureUser() || this.authService.isAdmin();
  }

  if (url.includes('divers')) {
    return this.authService.isDiversUser() || this.authService.isAdmin();
  }

  if (url.includes('article')) {
    return (
      this.authService.isTissuUser() ||
      this.authService.isFournitureUser() ||
      this.authService.isDiversUser() ||
      this.authService.isAdmin()
    );
  }

  return false;
}
getHomeRoute(): string {
  if (this.authService.isTissuUser()) return '/stock/entree-tissu';
  if (this.authService.isFournitureUser()) return '/stock/entree-fourniture';
  if (this.authService.isDiversUser()) return '/stock/entree-divers';
  if (this.authService.isAdmin()) return '/admin/manage-personal-admins'; // ou autre

  return '/login'; // fallback sécurité
}



  isVisible(name: string): boolean {
  const lowered = name.toLowerCase();
  return (
    (lowered.includes('tissu') && (this.authService.isTissuUser() || this.authService.isAdmin())) ||
    (lowered.includes('fourniture') && (this.authService.isFournitureUser() || this.authService.isAdmin())) ||
    (lowered.includes('divers') && (this.authService.isDiversUser() || this.authService.isAdmin())) ||
    (lowered.includes('article') || lowered.includes('chatbot') || lowered.includes('assistant') || lowered.includes('se déconnecter'))
  );
}

}  

export interface NavItem {
  title: boolean;
  name: string;
  url?: string;
  icon?: string;
}


