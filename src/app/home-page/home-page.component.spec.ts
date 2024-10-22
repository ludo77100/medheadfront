import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'; 

import { provideRouter } from '@angular/router';

import { By } from '@angular/platform-browser';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('devrait avoir un bouton New Emergency', () => {
    const button = fixture.debugElement.query(By.css('#new-emergency-btn'));
    expect(button).toBeTruthy();
  });

  it('le bouton New Emergency doit avoir le texte correct', () => {
    const button = fixture.debugElement.query(By.css('#new-emergency-btn')).nativeElement;
    expect(button.textContent).toContain('New Emergency');
  });

  // Vérification de la route après un clic sur le bouton
  it('devrait naviguer vers /new-emergency lors du clic', () => {
    const routerLink = fixture.debugElement.query(By.css('#new-emergency-btn')).attributes['ng-reflect-router-link'];
    expect(routerLink).toBe('/new-emergency');
  });

});
