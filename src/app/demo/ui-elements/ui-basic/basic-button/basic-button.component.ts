// src/app/demo/ui-elements/ui-basic/basic-button/basic-button.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-basic-button',
  standalone: true,
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.scss'],
  imports: [
    CommonModule,
    NgbDropdownModule,
    CardComponent
  ]
})
export class BasicButtonComponent {}
