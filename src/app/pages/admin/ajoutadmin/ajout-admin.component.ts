import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajout-admin',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './ajout-admin.component.html',
  styleUrls: ['./ajout-admin.component.scss']
})
export class AjoutAdminComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      enabled: true, // boolean
      typeAdmin: ['', Validators.required]
    });

    console.log('🟢 Formulaire initialisé :', this.form.value);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.warn('❗ Formulaire invalide');
      return;
    }

    const formData = this.form.value;

    const adminData = {
      username: formData.username,
      password: formData.password,
      enabled: formData.enabled // ✅ boolean envoyé directement
    };

    console.log('📤 Données à envoyer :', adminData);

    this.adminService.createAdmin(adminData).subscribe({
      next: () => {
        console.log('✅ Administrateur créé avec succès !');
        alert('Administrateur créé avec succès');
        this.router.navigate(['/admin/manage-personal-admins']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la création :', err);
        alert("Erreur lors de la création de l'administrateur.");
      }
    });
  }

  onToggleEnabled(): void {
    const current = this.form.get('enabled')?.value;
    this.form.patchValue({ enabled: !current });
    console.log('🔄 Toggle enabled →', !current);
  }

  redirigerVersAjout(): void {
    console.log('↩️ Redirection vers l’ajout d’un admin');
    this.router.navigate(['/admin/ajout-admin']);
  }
}
