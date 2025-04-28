import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-search',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent {
  searchInterval;
  searchWidth: number = 0;
  searchWidthString: string;

  searchOn() {
    document.querySelector('#main-search').classList.add('open');
    this.searchInterval = setInterval(() => {
      if (this.searchWidth >= 170) {
        clearInterval(this.searchInterval);
      }
      this.searchWidth += 30;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  searchOff() {
    this.searchInterval = setInterval(() => {
      if (this.searchWidth <= 0) {
        document.querySelector('#main-search').classList.remove('open');
        clearInterval(this.searchInterval);
      }
      this.searchWidth -= 30;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }
}