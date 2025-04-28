import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('collapsedCard', [
      state('collapsed, void', style({ overflow: 'hidden', height: '0px' })),
      state('expanded', style({ overflow: 'hidden', height: AUTO_STYLE })),
      transition('collapsed <=> expanded', animate('400ms ease-in-out'))
    ]),
    trigger('cardRemove', [
      state('open', style({ opacity: 1 })),
      state('closed', style({ opacity: 0, display: 'none' })),
      transition('open <=> closed', animate('400ms ease-in-out'))
    ])
  ]
})
export class CardComponent {
  @Input() cardTitle = 'Card Title';
  @Input() cardClass = '';
  @Input() blockClass = '';
  @Input() headerClass = '';
  @Input() options = true;
  @Input() hidHeader = false;
  @Input() customHeader = false;

  animation = '';
  fullIcon = 'icon-maximize';
  isAnimating = false;
  collapsedCard = 'expanded';
  collapsedIcon = 'icon-minus';
  loadCard = false;
  cardRemove = 'open';

  fullCardToggle(element: HTMLElement): void {
    const isFullCard = this.cardClass === 'full-card';
    this.animation = isFullCard ? 'zoomOut' : 'zoomIn';
    this.fullIcon = isFullCard ? 'icon-maximize' : 'icon-minimize';
    this.cardClass = isFullCard ? '' : 'full-card';
    this.isAnimating = true;

    setTimeout(() => {
      if (this.cardClass !== 'full-card') {
        document.body.removeAttribute('style');
      } else {
        document.body.style.overflow = 'hidden';
      }
      this.isAnimating = false;
    }, 500);
  }

  collapsedCardToggle(): void {
    this.collapsedCard = this.collapsedCard === 'collapsed' ? 'expanded' : 'collapsed';
    this.collapsedIcon = this.collapsedCard === 'collapsed' ? 'icon-plus' : 'icon-minus';
  }

  cardRefresh(): void {
    this.loadCard = true;
    this.cardClass = 'card-load';
    setTimeout(() => {
      this.loadCard = false;
      this.cardClass = 'expanded';
    }, 3000);
  }

  cardRemoveAction(): void {
    this.cardRemove = this.cardRemove === 'closed' ? 'open' : 'closed';
  }
}
