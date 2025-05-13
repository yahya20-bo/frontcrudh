import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortieArticleComponent } from './sortie-article.component';

describe('SortieArticleComponent', () => {
  let component: SortieArticleComponent;
  let fixture: ComponentFixture<SortieArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortieArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortieArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
