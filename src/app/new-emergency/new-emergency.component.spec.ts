import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmergencyComponent } from './new-emergency.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'; 

import { provideRouter } from '@angular/router';

describe('NewEmergencyComponent', () => {
  let component: NewEmergencyComponent;
  let fixture: ComponentFixture<NewEmergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEmergencyComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
