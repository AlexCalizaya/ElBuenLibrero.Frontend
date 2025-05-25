import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CartStateService } from '../../../core/services/cart-state.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { Client } from '../../../core/interfaces/Client';
import { BookCart } from '../../../core/interfaces/Book';
import { Purchase } from '../../../core/interfaces/Purchase';
import { Router } from '@angular/router';
import { HomeStateService } from '../../../core/services/home-state.service';

@Component({
  selector: 'app-client-data-modal',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './client-data-modal.component.html',
  styleUrl: './client-data-modal.component.scss'
})
export class ClientDataModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  @Input() isModalOpen!: boolean;
  cartState = inject(CartStateService).state;
  homeState = inject(HomeStateService).state;
  docForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("libros del carrito",this.cartState.books());
    this.docForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      docType: ['D'],
      doc: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paymentMethod: ['Efectivo', Validators.required],
      voucher: ['B', Validators.required]
    });

    this.docForm.get('docType')?.valueChanges.subscribe(value => {
      this.updateValidators(value);
    });
  }

  updateValidators(type: string): void {
    const control = this.docForm.get('doc');
    if (!control) return;

    if (type === 'D') {
      control.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]);
    } else if (type === 'R') {
      control.setValidators([Validators.required, Validators.pattern(/^\d{11}$/)]);
    } else if (type === 'X') {
      control.setValidators([Validators.required, Validators.pattern(/^\d{20}$/)]);
    }

    control.updateValueAndValidity();
  }

  closeModal() {
    this.close.emit();
  }

  finishPurchase() {
  if (this.docForm.valid) {
    const formData = this.docForm.value;

    const bookList: BookCart[] = this.cartState.books();

    const client: Client = {
      id: 0,
      first_name: formData.firstName,
      last_name: formData.lastName,
      doc_type: formData.docType,
      doc_number: formData.doc,
      phone: formData.phone,
      email: formData.email
    };

    const finishPurchase: Purchase = {
      bookList,
      client,
      paymentMethod: formData.paymentMethod,
      voucher: formData.voucher
    };

    this.orderService.finishPurchase(finishPurchase).subscribe({
      next: () => {
        console.log('Compra finalizada');
        alert('Compra finalizada! Gracias por su compra :)');
        this.cartState.clear();
        this.closeModal();
        this.homeState.getBooks();
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.closeModal();
        console.error('Error al finalizar la compra:', error);
        if (error.status === 500) {
          alert(error.error?.message || 'Error interno del servidor');
        } else {
          alert('Ocurrió un error inesperado');
        }
      }
    });

  } else {
    alert('Campos inválidos en el formulario');
  }
}

}
