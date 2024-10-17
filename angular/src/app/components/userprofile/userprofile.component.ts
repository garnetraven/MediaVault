import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  imports: [ FormsModule, CommonModule],
  standalone: true,
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  activeTab: string = 'profile';
  password = {
    current: '',
    new: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getCurrentUser().subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.error('Error loading user profile:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  updateSettings() {
    if (this.user) {
      this.authService.updateUserProfile(this.user.username, this.user).subscribe(
        (updatedUser: User) => {
          console.log('Settings updated', updatedUser);
          this.user = updatedUser;
        },
        (error: any) => {
          console.error('Error updating settings:', error);
          // Handle error (e.g., show error message to user)
        }
      );
    }
  }

  updatePassword() {
  if (this.user && this.user.username) {
    this.authService.updatePassword(this.user.username, this.password.current, this.password.new).subscribe(
      () => {
        console.log('Password updated successfully');
        this.password = { current: '', new: '' };
        // Show success message to user
        // For example: this.showSuccessMessage('Password updated successfully');
      },
      (error: any) => {
        console.error('Error updating password:', error);
        // Handle error (e.g., show error message to user)
        // For example: this.showErrorMessage('Failed to update password. Please try again.');
      }
    );
  } else {
    console.error('User is not logged in or username is not available');
    // Handle the case where user is not available
    // For example: this.showErrorMessage('You must be logged in to change your password');
  }
}
}
