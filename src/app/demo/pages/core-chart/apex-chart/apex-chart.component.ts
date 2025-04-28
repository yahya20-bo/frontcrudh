import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component'; // Chemin correct
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-apex-chart',
  standalone: true,
  imports: [CommonModule, CardComponent, NgApexchartsModule],
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss']
})
export class ApexChartComponent {
  @ViewChild('chart') chart!: ChartComponent;
  barSimpleChart!: Partial<ApexOptions>;
  barStackedChart!: Partial<ApexOptions>;
  areaAngleChart!: Partial<ApexOptions>;
  areaSmoothChart!: Partial<ApexOptions>;
  lineAreaChart!: Partial<ApexOptions>;
  donutChart!: Partial<ApexOptions>;
}
