import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSortieArticleComponent } from './ajout-sortie-article.component';

describe('AjoutSortieArticleComponent', () => {
  let component: AjoutSortieArticleComponent;
  let fixture: ComponentFixture<AjoutSortieArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutSortieArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutSortieArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
