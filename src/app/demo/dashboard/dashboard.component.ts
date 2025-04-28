import { Component } from '@angular/core';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { AppCardComponent } from 'src/app/theme/shared/components/app-card/app-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CardComponent,
    AppCardComponent,
  ],
})
export class DashboardComponent {
  sales = []; // Remplis avec tes données
  card = []; // Remplis avec tes données
  social_card = []; // Remplis avec tes données
  progressing = []; // Remplis avec tes données
  tables = []; // Remplis avec tes données
}
