import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthStateService } from '../../services/authstate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class NavbarComponent{
  currentRoute: string = '';

  constructor(private router: Router, private authStateService: AuthStateService) {
    this.router.events.subscribe ((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  signOut() {
    this.authStateService.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/userprofile']);
  }

  isDashboardPage(): boolean {
    return this.currentRoute === '/dashboard'
  }

  isUserProfilePage(): boolean {
    return this.currentRoute === '/userprofile'
  }
}
