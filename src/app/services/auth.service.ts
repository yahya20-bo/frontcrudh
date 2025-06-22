import { jwtDecode } from 'jwt-decode'; // ✅ correct
import { Injectable } from '@angular/core';

interface JwtPayload {
  sub: string; // le username (ex: "tissu1", "divers2", etc.)
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getUsernameFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub || null;
    } catch (error) {
      console.error('Erreur de décodage du token :', error);
      return null;
    }
  }

  isTissuUser(): boolean {
    const username = this.getUsernameFromToken();
    return !!username && username.toLowerCase().includes('tissu');
  }
  isAdmin(): boolean {
  const username = this.getUsernameFromToken();
  return (
    !!username &&
    !username.toLowerCase().includes('tissu') &&
    !username.toLowerCase().includes('fourniture') &&
    !username.toLowerCase().includes('divers')
  );
}

  isFournitureUser(): boolean {
    const username = this.getUsernameFromToken();
    return !!username && username.toLowerCase().includes('fourniture');
  }

  isDiversUser(): boolean {
    const username = this.getUsernameFromToken();
    return !!username && username.toLowerCase().includes('divers');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
