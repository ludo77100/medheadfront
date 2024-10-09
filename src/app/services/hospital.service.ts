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
    console.log(this.httpClient.get(`${this.baseUrl}/specialityGroup/all`));
    return this.httpClient.get(`${this.baseUrl}/specialityGroup/all`);
  }

}
