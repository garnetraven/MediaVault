import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../services/media.service';
import { Router } from '@angular/router';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  searchTerm: string = '';
  filteredMediaItems: Media[] = [];
  mediaItems: Media[] = [];
  showAddMediaForm: boolean = false;
  showEditModal: boolean = false;
  newMedia: Media = { id: 0, name: "", mediaType: "", imageUrl: "" };
  editingMedia: any = {id: 0, name: "", mediaType: "", imageUrl: ""};

  constructor(private mediaService: MediaService, private router: Router) {}

  ngOnInit() {
    this.loadMediaTypes();
  }

  loadMediaTypes() {
    this.mediaService.getMediaItems().subscribe(
      data => {
        this.mediaItems = data;
        this.filterMediaItems();
        console.log('Search term:', this.searchTerm);
        console.log('Filtered items:', this.filteredMediaItems);
      },
      error => console.error('Error fetching media types:', error)
    );
  }

  filterMediaItems() {
    if (!this.searchTerm) {
      this.filteredMediaItems = this.mediaItems;
      console.log(this.filteredMediaItems)
    } else {
      const searchTerm = this.searchTerm.toLowerCase();
      this.filteredMediaItems = this.mediaItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
      );
    }
  }

  onSearchChange(newValue?: string) {
    if (newValue !== undefined) {
      this.searchTerm = newValue;
    }
    this.filterMediaItems();
  }

  openAddMediaForm() {
    this.showAddMediaForm = true;
    this.newMedia = { id: 0, name: "", mediaType: "", imageUrl: "" }; // Reset the form
  }

  closeAddMediaForm() {
    this.showAddMediaForm = false;
  }

  addNewMedia() {
    console.log("Sending new media:", this.newMedia)
    this.mediaService.addMediaItem(this.newMedia).subscribe(
      response => {
        console.log('Media added successfully', response);
        this.mediaItems.push(response);
        this.closeAddMediaForm();
      },
      error => console.error('Error adding media:', error)
    );
  }

  deleteMedia(id: number) {
    if (confirm("Are you sure you want to delete this media item?")) {
      this.mediaService.deleteMediaItem(id).subscribe(
        () => {
          console.log("Media deleted successfully");
          this.mediaItems = this.mediaItems.filter(item => item.id !== id);
        },
        error => console.error("Error deleting media: ", error)
      );
    }
  }

  openEditModal(item: any) {
    this.editingMedia = { ...item };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  updateMediaName() {
    this.mediaService.updateMedia(this.editingMedia.id, this.editingMedia).subscribe(
      (updatedMedia: Media) => {
        console.log('Media updated successfully', updatedMedia);
        const index = this.mediaItems.findIndex(item => item.id === updatedMedia.id);
        if (index !== -1) {
          this.mediaItems[index] = updatedMedia;
        }
        this.closeEditModal();
      },
      error => console.error('Error updating media:', error)
    );
  }

  goToProfile() {
    this.router.navigate(['/userprofile'])
  }

  signOut() {
    this.router.navigate(['/login'])
  }
}
