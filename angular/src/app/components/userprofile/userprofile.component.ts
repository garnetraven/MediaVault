import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  imports: [ FormsModule, CommonModule],
  standalone: true,
})
export class UserProfileComponent {
  constructor(private router: Router) {}
  
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    notifications: 'enabled',
    memberSince: new Date('2021-01-15'),
    profileImageUrl: 'https://imgs.search.brave.com/WxVALL1Op5-rTCoQIYZXBRZ4BtbduU9IS6SCDXeQZfs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zaW1wbGUtc21p/bGUtaGFwcHktbWFu/LWRpZ2l0YWwtcG9y/dHJhaXQtYnJpZ2h0/LXJlZC1iYWNrZ3Jv/dW5kXzk2NDYxLTEz/MzE1LmpwZz9zaXpl/PTYyNiZleHQ9anBn'
  };

  password = {
    current: '',
    new: ''
  };

  activeTab: string = 'profile';

  onSubmit() {
    this.router.navigate(['/dashboard']);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

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
