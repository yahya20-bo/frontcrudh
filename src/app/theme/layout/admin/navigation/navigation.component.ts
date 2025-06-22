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
    return this.router.url === '/login';
  }

  logout(): void {
    localStorage.removeItem('token');         // ⛔ Supprime le JWT
    this.router.navigate(['/login']);         // 🔁 Redirige vers la page de login
  }
}  
export interface NavItem {
  title: boolean;
  name: string;
  url?: string;
  icon?: string;
}


