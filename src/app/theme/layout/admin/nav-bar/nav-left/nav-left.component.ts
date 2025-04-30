import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavSearchComponent } from './nav-search/nav-search.component';
import screenfull from 'screenfull';

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [CommonModule, NavSearchComponent],
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit, OnDestroy {
  screenFull = true;

  ngOnInit() {
    if (screenfull.isEnabled) {
      this.screenFull = screenfull.isFullscreen;
      screenfull.on('change', () => {
        this.screenFull = screenfull.isFullscreen;
      });
    }
  }

  ngOnDestroy() {
    if (screenfull.isEnabled) {
      screenfull.off('change', () => {
        this.screenFull = screenfull.isFullscreen;
      });
    }
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle().then(() => {
        this.screenFull = screenfull.isFullscreen;
      });
    }
  }
}