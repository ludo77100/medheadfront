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

  it('should initialize the form', () => {
    expect(component.form.contains('userLat')).toBeTrue();
    expect(component.form.contains('userLon')).toBeTrue();
    expect(component.form.contains('specialityGroupId')).toBeTrue();
    expect(component.form.contains('specialityId')).toBeTrue();
  });

  it('should display hospital information correctly', () => {
    component.closestHospitalList = [
      { hospital: { hospitalName: 'Hôpital A' }, time: 10, distance: 5, bedCode: 'ABC123', bedId: 1 }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.hospital-card h2').textContent).toContain('Hôpital A');
    expect(compiled.querySelector('.card-title').textContent).toContain('10 minutes');
    expect(compiled.querySelector('.card-text').textContent).toContain('5 km');
  });


  it('should handle bed booking', () => {
    
    component.closestHospitalList = [
      { hospital: { hospitalName: 'Hôpital A' }, time: 10, distance: 5, bedCode: 'ABC123', bedId: 1 }
    ];
  
    fixture.detectChanges();
  
    const button = fixture.nativeElement.querySelector('#book-btn');
    expect(button).not.toBeNull();
  
    spyOn(component, 'bookBed');
    button.click();
  
    expect(component.bookBed).toHaveBeenCalled();
  });

});
