import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../services/auth-service.service'; 
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginFailed = false;
  isLoggedIn = false;
  errorMessage = 'Login failed';
  roles: string[] = [];


  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private token: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful', response);
          this.token.saveToken(response.accessToken);
          this.token.saveUser(response);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.token.getUser().roles;
          this.router.navigate(['/']);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }
}