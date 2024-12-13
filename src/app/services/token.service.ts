import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  /**
   * Déconnecte l'utilisateur en supprimant toutes les données de session.
   * 
   * Supprime toutes les entrées de sessionStorage
   * Redirige l'utilisateur vers la page de connexion
   */
  signOut(): void {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Enregistre le token JWT dans le sessionStorage
   * 
   * Supprime le token existant
   * Enregistre le nouveau token
   * 
   * @param token Le token JWT à enregistrer
   */
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Récupère le token JWT depuis le sessionStorage
   * 
   * @returns Le token JWT s'il existe, sinon null
   */
  public getToken(): string | null {
    const tokenData = JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
    return tokenData.token || null;
    }

  /**
   * Enregistre les informations de l'utilisateur dans le sessionStorage
   * 
   * Supprime les anciennes informations
   * Enregistre les nouvelles informations de l'utilisateur
   * 
   * @param user Les informations de l'utilisateur à enregistrer
   */
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Récupère les informations de l'utilisateur depuis le sessionStorage
   * 
   * @returns Les informations de l'utilisateur sous forme d'objet, ou un objet vide si non trouvé
   */
  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

}
