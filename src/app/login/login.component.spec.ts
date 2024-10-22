import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email and password fields', () => {
    const emailField = component.loginForm.get('email');
    const passwordField = component.loginForm.get('password');
    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable the submit button if the form is valid', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should display an error message if the email field is invalid and touched', () => {
    const emailInput = component.loginForm.get('email');
    emailInput?.markAsTouched();
    emailInput?.setValue('');
    fixture.detectChanges();

    const emailError = fixture.debugElement.query(By.css('.text-danger')).nativeElement;
    expect(emailError).toBeTruthy();
  });

  it('should call the onSubmit method when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
