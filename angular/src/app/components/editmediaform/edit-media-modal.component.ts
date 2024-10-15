import { Input, Output, Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-edit-media-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Media</h3>
        <form (ngSubmit)="onSubmit()">
          <!-- Form fields here -->
          <div class="mt-4 flex justify-end">
            <button type="button" (click)="onCancel()" class="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EditMediaModalComponent {
  @Input() editingMedia!: Media;
  @Output() update = new EventEmitter<Media>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.update.emit(this.editingMedia);
  }

  onCancel() {
    this.cancel.emit();
  }
}
