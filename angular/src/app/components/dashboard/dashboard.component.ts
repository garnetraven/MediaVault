import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  mediaItems: any[] = [];

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
    this.loadUsers();
    this.loadMediaTypes();
  }

  loadUsers() {
    this.mediaService.getUsers().subscribe(
      data => this.users = data,
      error => console.error('Error fetching users:', error)
    );
  }

  loadMediaTypes() {
    this.mediaService.getMediaItems().subscribe(
      data => this.mediaItems = data,
      error => console.error('Error fetching media types:', error)
    );
  }

  // Add methods for creating users and media types
}
