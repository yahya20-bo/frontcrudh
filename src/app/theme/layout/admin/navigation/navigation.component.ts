import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavLogoComponent } from '../navigation/nav-logo/nav-logo.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [NavLogoComponent],
})
export class NavigationComponent {
  @Input() navCollapsed!: boolean;
  @Output() NavCollapse = new EventEmitter();
  
  navCollapseEvent() {
    this.NavCollapse.emit();
  }
}
