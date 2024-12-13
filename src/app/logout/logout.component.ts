import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService) { }

  /**
   * Redirection automatique après un logout
   */
  ngOnInit(): void {

    this.tokenService.signOut();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 4000);
  }

}