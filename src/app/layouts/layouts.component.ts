import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header';

@Component({
  selector: 'app-layouts',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layouts.component.html',
})
export class LayoutsComponent {

}

