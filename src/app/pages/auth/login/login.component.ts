import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, public authService: AuthService) {
   this.loginForm = this.fb.group({
  username: ['admin', Validators.required],
  password: ['leMotDePasseOriginal', Validators.required] // exemple : admin123
});


  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      
      // ✅ Token exists — redirect to default page
      this.router.navigate(['/stock/entree-tissu']);
    }
  }
  getHomeRoute(): string {
  if (this.authService.isTissuUser()) return '/stock/entree-tissu';
  if (this.authService.isFournitureUser()) return '/stock/entree-fourniture';
  if (this.authService.isDiversUser()) return '/stock/entree-divers';
  if (this.authService.isAdmin()) return '/admin/home';
  return '/login';
}

  login() {
  const credentials = this.loginForm.value;
  const username = credentials.username; // ← récupérer le nom d'utilisateur saisi

  this.http.post<any>('http://localhost:8080/api/auth/login', credentials)
    .subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        console.log('Token:', res.token);
        console.log('RES:', res);

        // ✅ Comparer avec le champ saisi dans le formulaire
        if (username === 'admin') {
          this.router.navigate(['/admin/home']);
        } else {
const destination = this.getHomeRoute();
  console.log('➡️ Redirection vers :', destination);
  this.router.navigate([destination]);        }
      },
      error: err => {
        this.errorMessage = 'Identifiants invalides ou accès refusé (403)';
        console.error(err);
      }
    });
  }}