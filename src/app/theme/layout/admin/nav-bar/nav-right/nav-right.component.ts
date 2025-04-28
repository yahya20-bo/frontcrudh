import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownConfig, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent {
  constructor() {
    const config = inject(NgbDropdownConfig);
    config.placement = 'bottom-right';
  }
}