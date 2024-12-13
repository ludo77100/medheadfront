import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  /**
   * Envoie une requête de connexion avec l'email et le mot de passe de l'utilisateur
   * 
   * @param email L'adresse email de l'utilisateur
   * @param password Le mot de passe de l'utilisateur
   * @returns Un Observable contenant la réponse de l'API
   */
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.http.post<any>(this.apiUrl + "/login", body, { headers });
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   * 
   * recherche la présence d'un jeton d'utilisateur dans le sessionStorage
   * 
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('auth-user');
    return !!token;
  }


}