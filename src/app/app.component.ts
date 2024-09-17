import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { MenuComponent } from "./menu/menu.component";
import { CommonModule } from '@angular/common';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Medhead-front';

  constructor(public authService: AuthServiceService) {}

}
