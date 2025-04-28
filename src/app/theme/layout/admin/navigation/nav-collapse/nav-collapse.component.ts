import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from 'src/app/theme/layout/admin/navigation/nav-item/nav-item.component';

@Component({
  selector: 'app-nav-collapse',
  standalone: true,
  imports: [CommonModule, NavItemComponent],
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss']
})
export class NavCollapseComponent {
  @Input() item: any;
}
