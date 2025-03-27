import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @ViewChild('menuContainer') menuContainer!: ElementRef;
  public readonly isMenuOpen = signal(false);

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.menuContainer && !this.menuContainer.nativeElement.contains(event.target)) {
      this.isMenuOpen.set(false);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
