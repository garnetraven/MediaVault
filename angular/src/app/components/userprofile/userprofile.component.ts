import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  imports: [ FormsModule, CommonModule],
  standalone: true,
})
export class UserProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    notifications: 'enabled',
    memberSince: new Date('2021-01-15'),
    profileImageUrl: ''
  };

  password = {
    current: '',
    new: ''
  };

  activeTab: string = 'profile';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  updateSettings() {
    // Implement settings update logic here
    console.log('Settings updated', this.user);
  }

  updatePassword() {
    // Implement password update logic here
    console.log('Password updated', this.password);
  }
}
