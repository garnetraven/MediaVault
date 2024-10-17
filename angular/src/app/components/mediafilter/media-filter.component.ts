import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-media-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './media-filter.component.html',
  styleUrls: ['./media-filter.component.css']
})
export class MediaFilterComponent {
  @Output() filterChange = new EventEmitter<string>();
  selectedType: string = '';

  onFilterChange() {
    console.log(this.selectedType);
    this.filterChange.emit(this.selectedType);
  }
}