import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ nécessaire pour ngClass
import { AdminService } from 'src/app/services/admin.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-manage-personal-admins',
  standalone: true, // ✅ si standalone
  imports: [CommonModule,RouterModule], // ✅ ici !
  templateUrl: './manage-personal-admins.component.html',
  styleUrls: ['./manage-personal-admins.component.scss']
})
export class ManagePersonalAdminsComponent implements OnInit {
  admins: any[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe({
      next: (data) => {
        this.admins = data;
        console.log('Admins reçus :', this.admins);
                this.admins = data.filter(admin => admin.id !== 1);

      },
      error: (err) => {
        console.error('Erreur lors du chargement des admins', err);
      }
    });
  }
  ajouterAdmin() {
    this.router.navigate(['admin/ajout-admin']);         // 🔁 Redirige vers la page d'ajout
  }
  logout(): void {
    localStorage.removeItem('token');         // ⛔ Supprime le JWT
    this.router.navigate(['/login']);         // 🔁 Redirige vers la page de login
  }
  deleteAdmin(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer cet administrateur ?')) {
    this.adminService.deleteAdmin(id).subscribe({
      next: () => {
        // Actualiser la liste après suppression
        this.admins = this.admins.filter(admin => admin.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
        alert('Une erreur est survenue lors de la suppression.');
      }
    });
  }
}

}
