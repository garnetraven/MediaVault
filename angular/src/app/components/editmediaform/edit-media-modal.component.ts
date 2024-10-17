import { Input, Output, Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-edit-media-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-media-modal.component.html',
  styleUrls: ['./edit-media-modal.component.css']
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
