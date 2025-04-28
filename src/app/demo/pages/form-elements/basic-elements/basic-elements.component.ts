import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../theme/shared/shared.module'; // <-- CORRECT chemin relatif

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent {}
