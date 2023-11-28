import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() onNavigate = new EventEmitter<string>();

  navigateTo(value:string) {
    this.onNavigate.emit(value);
  }
}
