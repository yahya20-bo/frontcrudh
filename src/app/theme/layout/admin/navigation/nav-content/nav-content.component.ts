import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavGroupComponent } from 'src/app/theme/layout/admin/navigation/nav-group/nav-group.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule, NavGroupComponent, NgScrollbarModule],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent {} // <-- ici, c'est NavContentComponent à exporter !
