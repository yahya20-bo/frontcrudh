import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component'; // <-- importer CardComponent ici

@Component({
  selector: 'app-basic-badge',
  standalone: true,
  imports: [CommonModule, CardComponent], // <-- ajouter ici
  templateUrl: './basic-badge.component.html',
  styleUrls: ['./basic-badge.component.scss']
})
export class BasicBadgeComponent {}
