import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-client-data-modal',
  standalone: true,
  imports: [],
  templateUrl: './client-data-modal.component.html',
  styleUrl: './client-data-modal.component.scss'
})
export class ClientDataModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() isModalOpen!: boolean;

  closeModal() {
    this.close.emit();
  }

}
