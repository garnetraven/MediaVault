import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ FormsModule],
  standalone: true,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Handle successful login (e.g., store token, redirect)
        this.router.navigate(['/home']);
      },
      error => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
}
