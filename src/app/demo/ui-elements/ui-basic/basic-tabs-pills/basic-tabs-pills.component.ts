// src/app/demo/ui-elements/ui-basic/basic-tabs-pills/basic-tabs-pills.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-basic-tabs-pills',
  standalone: true,
  templateUrl: './basic-tabs-pills.component.html',
  styleUrls: ['./basic-tabs-pills.component.scss'],
  imports: [
    CommonModule,
    NgbNavModule,
    CardComponent
  ]
})
export default class BasicTabsPillsComponent {}
