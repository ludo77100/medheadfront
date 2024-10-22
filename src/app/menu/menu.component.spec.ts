import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'; 

import { provideRouter } from '@angular/router';

import { By } from '@angular/platform-browser';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a link to "Home"', () => {
    const linkDebugElement = fixture.debugElement.query(By.css('a.navbar-brand'));
    const linkElement: HTMLElement = linkDebugElement.nativeElement;
    expect(linkElement.textContent).toContain('Accueil');
  });

  it('should contain a "New Emergency" link in the dropdown', () => {
    const dropdownLinkDebugElement = fixture.debugElement.query(By.css('a.dropdown-item'));
    const dropdownLinkElement: HTMLElement = dropdownLinkDebugElement.nativeElement;
    expect(dropdownLinkElement.textContent).toContain('New Emergency');
  });
});
