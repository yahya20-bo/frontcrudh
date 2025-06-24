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
    console.log(this.http.get<Admin[]>(this.apiUrl));
    return this.http.get<Admin[]>(this.apiUrl);
  }
}
  