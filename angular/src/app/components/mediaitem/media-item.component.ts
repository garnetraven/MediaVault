import { Input, Output, Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-media-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
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
