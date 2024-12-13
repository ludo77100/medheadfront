import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(private authService: AuthServiceService, private router: Router) {}

  /**
   * Vérifie si l'utilisateur est authentifié avant d'accéder à une route protégée
   * 
   * Si l'utilisateur est authentifié, l'accès est autorisé
   * Sinon, l'utilisateur est redirigé vers la page de connexion
   * 
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}