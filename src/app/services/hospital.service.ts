import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private baseUrl = 'http://localhost:8082'

  constructor(private httpClient: HttpClient) {}

  getAllSpecialityGroupWithChildren(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/specialityGroup/all`);
  }

  getClosestHospital(userLat: string, userLon: string, specialityId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/hospital/closest`, {
      params: {
        userLatStr: userLat,
        userLonStr: userLon,
        specialityId: specialityId
      }
    });
  }

}