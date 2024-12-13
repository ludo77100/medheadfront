import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private baseUrl = 'http://localhost:8082'

  constructor(private httpClient: HttpClient) {}

  /**
   * Récupère tous les groupes de spécialités avec leurs spécialités associées
   * 
   * @returns Un Observable contenant la liste des groupes de spécialités
   */
  getAllSpecialityGroupWithChildren(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/specialityGroup/all`);
  }

  /**
   * Récupère l'hôpital le plus proche avec des lits disponibles pour une spécialité donnée.
   * 
   * @param userLat Latitude de l'utilisateur
   * @param userLon Longitude de l'utilisateur
   * @param specialityId - Identifiant de la spécialité recherchée
   * @returns Un Observable contenant la liste des hôpitaux les plus proches
   */
  getClosestHospital(userLat: string, userLon: string, specialityId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/hospital/closest`, {
      params: {
        userLatStr: userLat,
        userLonStr: userLon,
        specialityId: specialityId
      }
    });
  }

  /**
   * Change l'état d'un lit (libre ou occupé) à partir de son ID
   * 
   * @param bedId Identifiant du lit à changer
   * @returns Un Observable contenant la réponse de l'API
   */
  changeBedState(bedId: number): Observable<any> {
    const body = { bedId };
    return this.httpClient.get(`${this.baseUrl}/bed/changestate`, {
      params:{
        bedId: bedId
      }

    });
  }

}