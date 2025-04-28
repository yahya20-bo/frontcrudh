import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from 'src/app/theme/layout/admin/navigation/nav-item/nav-item.component';
import { NavCollapseComponent } from 'src/app/theme/layout/admin/navigation/nav-collapse/nav-collapse.component';

@Component({
  selector: 'app-nav-group',
  standalone: true,
  imports: [CommonModule, NavItemComponent, NavCollapseComponent],
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.scss']
})
export class NavGroupComponent {
  @Input() item: any;
}
