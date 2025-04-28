import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component'; // <--- C'est bien card.component
import { FormsModule } from '@angular/forms'; // probablement utile
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'; // pour ngbDropdown !

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent, // <--- AJOUTÉ !!
    NgbDropdownModule // <--- pour corriger [placement]
  ],
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent {}
