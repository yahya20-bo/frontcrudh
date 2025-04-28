import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss'],
  imports: [
    CommonModule,
    CardComponent
  ]
})
export class TblBootstrapComponent {}
