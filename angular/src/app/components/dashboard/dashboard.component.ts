import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/media.model';
import { AuthStateService } from '../../services/authstate.service';

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
  newMedia: Media = { id: 0, name: "", mediaType: "", imageUrl: "", userId: 0 };
  editingMedia: Media = { id: 0, name: "", mediaType: "", imageUrl: "", userId: 0 };
  username: string = '';

  currentPage: number = 0;
  pageSize: number = 8;
  totalPages: number = 0;
  totalItems: number = 0;

  constructor(
    private mediaService: MediaService, 
    private authStateService: AuthStateService,
  ) {}

  ngOnInit() {
    this.username = this.authStateService.currentUserValue || '';
    if (!this.username) {
      console.error('No authenticated user');
    } else {
      this.loadMediaItems();
    }
  }

  loadMediaItems() {
    this.mediaService.getMediaItemsByUsername(this.username, this.currentPage, this.pageSize).subscribe(
      response => {
        this.mediaItems = response.content;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalElements;
        this.currentPage = response.number;
        this.filterMediaItems();
      },
      error => console.error('Error fetching media items:', error)
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMediaItems();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMediaItems();
    }
  }

  filterMediaItems() {
    if (!this.searchTerm) {
      this.filteredMediaItems = this.mediaItems;
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
    this.newMedia = { id: 0, name: "", mediaType: "", imageUrl: "", userId: 0 };
  }

  closeAddMediaForm() {
    this.showAddMediaForm = false;
  }

  addNewMedia() {
    this.mediaService.addMediaItem(this.username, this.newMedia).subscribe(
      response => {
        console.log('Media added successfully', response);
        this.closeAddMediaForm();
        this.loadMediaItems();
      },
      error => console.error('Error adding media:', error)
    );
  }

  deleteMedia(id: number) {
    if (confirm("Are you sure you want to delete this media item?")) {
      this.mediaService.deleteMediaItem(id, this.username).subscribe(
        () => {
          console.log("Media deleted successfully");
          this.loadMediaItems();
        },
        error => console.error("Error deleting media: ", error)
      );
    }
  }

  openEditModal(item: Media) {
    this.editingMedia = { ...item };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  updateMediaName() {
    this.mediaService.updateMedia(this.editingMedia.id, this.username, this.editingMedia).subscribe(
      (updatedMedia: Media) => {
        console.log('Media updated successfully', updatedMedia);
        const index = this.mediaItems.findIndex(item => item.id === updatedMedia.id);
        if (index !== -1) {
          this.mediaItems[index] = updatedMedia;
        }
        this.closeEditModal();
        this.loadMediaItems();
      },
      error => console.error('Error updating media:', error)
    );
  }
}
