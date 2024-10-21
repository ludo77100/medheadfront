import { TestBed } from '@angular/core/testing';

import { HospitalService } from './hospital.service';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'; 

import { provideRouter } from '@angular/router';

describe('HospitalService', () => {
  let service: HospitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
            ]
    });
    service = TestBed.inject(HospitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
