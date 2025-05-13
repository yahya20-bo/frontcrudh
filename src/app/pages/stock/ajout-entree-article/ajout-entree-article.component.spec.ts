import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEntreeArticleComponent } from './ajout-entree-article.component';

describe('AjoutEntreeArticleComponent', () => {
  let component: AjoutEntreeArticleComponent;
  let fixture: ComponentFixture<AjoutEntreeArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutEntreeArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutEntreeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
