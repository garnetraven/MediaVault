import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  mediaItems: any[] = [];
  showAddMediaForm: boolean = false;
  newMedia: any = {};

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

  openAddMediaForm() {
    this.showAddMediaForm = true;
    this.newMedia = {}; // Reset the form
  }

  closeAddMediaForm() {
    this.showAddMediaForm = false;
  }

  addNewMedia() {
    this.mediaService.addMediaItem(this.newMedia).subscribe(
      response => {
        console.log('Media added successfully', response);
        this.mediaItems.push(response);
        this.closeAddMediaForm();
      },
      error => console.error('Error adding media:', error)
    );
  }
}
