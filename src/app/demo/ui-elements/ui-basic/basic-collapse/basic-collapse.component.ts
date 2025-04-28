// src/app/demo/ui-elements/ui-basic/basic-collapse/basic-collapse.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-basic-collapse',
  standalone: true,
  templateUrl: './basic-collapse.component.html',
  styleUrls: ['./basic-collapse.component.scss'],
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgbAccordionModule,
    CardComponent
  ]
})
export default class BasicCollapseComponent {
  isCollapsed = true;
  multiCollapsed1 = true;
  multiCollapsed2 = true;
  loremText = 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus...';
}
