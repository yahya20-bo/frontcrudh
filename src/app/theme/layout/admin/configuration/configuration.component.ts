// Angular imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  // Tu pourras ajouter des propriétés et méthodes ici si besoin
}
