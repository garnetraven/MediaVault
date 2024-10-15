import { Input, Output, Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-media-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img [src]="item.imageUrl || 'path_to_default_thumbnail'" 
          [alt]="item.name + ' Thumbnail'" 
          class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
        <p class="text-m font-semibold text-gray-700">{{ item.mediaType }}</p>
        <div class="mt-4 flex justify-between">
          <button (click)="onEdit()" class="text-blue-500 hover:text-blue-600">Edit</button>
          <button (click)="onDelete()" class="text-red-500 hover:text-red-600">Delete</button>
        </div>
      </div>
    </div>
  `
})
export class MediaItemComponent {
  @Input() item!: Media;
  @Output() edit = new EventEmitter<Media>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.item);
  }

  onDelete() {
    this.delete.emit(this.item.id);
  }
}
