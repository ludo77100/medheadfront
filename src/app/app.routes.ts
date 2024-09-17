import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuardService] },
    { path: 'patient-form', component: PatientFormComponent, canActivate: [AuthGuardService]},
    { path: '',   redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }

];
