import { TestBed } from '@angular/core/testing';

import { HospitalService } from './hospital.service';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing'; 

import { provideRouter } from '@angular/router';

describe('HospitalService', () => {
  
  let service: HospitalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        HospitalService
      ]
    });
    service = TestBed.inject(HospitalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes HTTP en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devrait retourner la liste des hôpitaux proches via GET', () => {
    const dummyHospitals = [
      { id: 1, name: 'Hospital A', location: 'Location A' },
      { id: 2, name: 'Hospital B', location: 'Location B' },
    ];
  
    const userLatStr = '51.509865';
    const userLonStr = '-0.118092';
    const specialityId = 1;
  
    service.getClosestHospital(userLatStr, userLonStr, specialityId).subscribe((hospitals) => {
      expect(hospitals.length).toBe(2);
      expect(hospitals).toEqual(dummyHospitals);
    });
  
    const req = httpMock.expectOne((request) => request.url.includes('/hospital/closest') &&
      request.params.has('userLatStr') && request.params.get('userLatStr') === userLatStr &&
      request.params.has('userLonStr') && request.params.get('userLonStr') === userLonStr &&
      request.params.has('specialityId') && request.params.get('specialityId') === specialityId.toString());
  
    expect(req.request.method).toBe('GET');
    req.flush(dummyHospitals);
  });

  

});
