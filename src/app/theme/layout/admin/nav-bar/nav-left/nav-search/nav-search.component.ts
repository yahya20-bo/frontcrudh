import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent {
  searchInterval: any;
  searchWidth: number = 0;
  searchWidthString: string = '0px';

  searchOn() {
    document.querySelector('#main-search')?.classList.add('open');
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
        document.querySelector('#main-search')?.classList.remove('open');
        clearInterval(this.searchInterval);
      }
      this.searchWidth -= 30;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }
}