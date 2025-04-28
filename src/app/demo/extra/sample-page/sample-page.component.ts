import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component'; // Chemin correct

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent {}
