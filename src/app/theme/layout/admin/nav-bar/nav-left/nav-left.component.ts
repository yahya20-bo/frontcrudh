import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import screenfull from 'screenfull';

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit, OnDestroy {
  screenFull = true;

  ngOnInit(): void {
    if (screenfull.isEnabled) {
      this.screenFull = screenfull.isFullscreen;
      screenfull.on('change', () => {
        this.screenFull = screenfull.isFullscreen;
      });
    }
  }

  ngOnDestroy(): void {
    if (screenfull.isEnabled) {
      screenfull.off('change', () => {
        this.screenFull = screenfull.isFullscreen;
      });
    }
  }

  toggleFullscreen(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle().then(() => {
        this.screenFull = screenfull.isFullscreen;
      });
    }
  }
}
