import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatStockArticleComponent } from './etat-stock-article.component';

describe('EtatStockArticleComponent', () => {
  let component: EtatStockArticleComponent;
  let fixture: ComponentFixture<EtatStockArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatStockArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatStockArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
