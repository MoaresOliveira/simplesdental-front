import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authChanged.subscribe(() => {
      this.validateUser();
    })
  }

  ngOnInit(): void {
    this.validateUser();
  }

  validateUser() {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('isAdmin:', this.isAdmin);
    console.log('isLoggedIn:', this.isLoggedIn);
  }

  home() {
    if (!this.isLoggedIn) {
      return
    }
    this.router.navigate(['/home']);
  }

}
