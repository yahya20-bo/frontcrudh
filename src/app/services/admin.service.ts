import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Admin {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admins';

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<Admin[]> {
    console.log("recuppppppppppppp");
    return this.http.get<Admin[]>(this.apiUrl);
  }
  createAdmin(adminData: { username: string; password: string; enabled: number }): Observable<any> {
  const url = `${this.apiUrl}/create`;
  return this.http.post(url, adminData);
}


  deleteAdmin(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log('🔴 Suppression admin ID =', id);
    return this.http.delete<void>(url);
  }
}
