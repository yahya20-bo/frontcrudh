import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

interface DashboardItem {
  title: string;
  amount: number;
  percentage: number;
  design: string;
  icon: string;
  progress: number;
  progress_bg: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgbProgressbar],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  items: DashboardItem[] = [
    {
      title: 'Total Entrées',
      amount: 150,
      percentage: 75,
      design: 'bg-primary',
      icon: 'fa-box',
      progress: 75,
      progress_bg: 'bg-primary'
    },
    {
      title: 'Total Sorties',
      amount: 100,
      percentage: 50,
      design: 'bg-warning',
      icon: 'fa-box-open',
      progress: 50,
      progress_bg: 'bg-warning'
    },
    {
      title: 'Stock Actuel',
      amount: 300,
      percentage: 90,
      design: 'bg-success',
      icon: 'fa-warehouse',
      progress: 90,
      progress_bg: 'bg-success'
    }
  ];
}
