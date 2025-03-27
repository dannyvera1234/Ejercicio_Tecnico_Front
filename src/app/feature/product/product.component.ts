import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { PRODUCT_INITIAL_STATE } from '../../store';
import { AddProductComponent, DeleteProductComponent } from './components';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TextInitialsPipe } from '../../pipe';

@Component({
  selector: 'app-product',
  imports: [AddProductComponent, DatePipe, DeleteProductComponent, FormsModule, RouterLink, TextInitialsPipe ],
  templateUrl: './product.component.html',
  styles: [
    `
    /* Estilos que se aplican solo a este componente */
    .table-container {
      padding: 0.5rem;
    }

    @media (max-width: 768px) {
      .table-container {
        overflow: auto;
      }
    }
  `
  ],
})
export class ProductComponent {
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isMenuOpen.set(null);
    }
  }
  public readonly productStore = inject(PRODUCT_INITIAL_STATE);
  public readonly isMenuOpen = signal<number | null>(null);
  public readonly title = signal<string | null>(null);
  searchTerm: string = '';

  constructor(private elRef: ElementRef) {
    this.productStore.allProducts();
  }


  onSearch(): void {
    this.productStore.searchTerm(this.searchTerm);
    this.productStore.filterProducts();
  }

  toggleMenu(index: number): void {
    this.isMenuOpen.set(this.isMenuOpen() === index ? null : index);
  }

  actionDelete(ide: string, name: string): void {
    this.productStore.idProduct(ide);
    this.title.set(name);
    this.productStore.openModal('deleteProduct');
    this.isMenuOpen.set(null);
  }


}
