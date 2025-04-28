import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-nav-logo',
  standalone: true,
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss'],
})
export class NavLogoComponent {
  @Input() navCollapsed!: boolean;
  @Output() NavCollapse = new EventEmitter();

  navCollapseEvent() {
    this.NavCollapse.emit();
  }
}
