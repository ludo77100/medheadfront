import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenService) {}

  /**
   * Intercepte les requêtes HTTP sortantes pour y ajouter le token JWT et gérer les erreurs
   *
   * @param req  La requête HTTP sortante
   * @param next  Le prochain handler dans la chaîne de requêtes
   * @returns Observable avec la réponse de la requête HTTP
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.token.signOut();
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}