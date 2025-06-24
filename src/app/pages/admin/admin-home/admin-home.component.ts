import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  constructor(private router: Router) {}

  goToPersonalAdmins() {
    this.router.navigate(['/admin/manage-personal-admins']);
  }

  goToUsineManagement() {
    this.router.navigate(['/stock/entree-tissu']);
  }
}
