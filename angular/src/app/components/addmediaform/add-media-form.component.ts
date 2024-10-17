import { Input, Output, Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-add-media-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-media-form.component.html',
  styleUrls: ['./add-media-form.component.css']
})
export class AddMediaFormComponent {
  @Input() newMedia!: Media;
  @Output() add = new EventEmitter<Media>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.add.emit(this.newMedia);
  }

  onCancel() {
    this.cancel.emit();
  }
}
