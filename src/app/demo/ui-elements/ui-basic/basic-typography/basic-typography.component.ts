import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-basic-typography',
  standalone: true,
  templateUrl: './basic-typography.component.html',
  styleUrls: ['./basic-typography.component.scss'],
  imports: [
    CommonModule,
    CardComponent
  ]
})
export class BasicTypographyComponent {}
