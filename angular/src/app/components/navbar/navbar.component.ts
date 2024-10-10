import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class NavbarComponent{
  currentRoute: string = '';

  constructor(private router: Router) {
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
