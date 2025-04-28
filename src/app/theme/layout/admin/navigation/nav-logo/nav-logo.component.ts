import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-logo',
  standalone: true,
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class NavLogoComponent {}
