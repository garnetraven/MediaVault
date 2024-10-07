import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
   <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username"  name="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password"  name="password" required>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    mat-card {
      max-width: 400px;
      width: 100%;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    button {
      width: 100%;
    }
  `]
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
