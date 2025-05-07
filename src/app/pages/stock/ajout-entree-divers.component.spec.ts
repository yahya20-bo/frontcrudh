import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEntreeDiversComponent } from './ajout-entree-divers.component';

describe('AjoutEntreeDiversComponent', () => {
  let component: AjoutEntreeDiversComponent;
  let fixture: ComponentFixture<AjoutEntreeDiversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutEntreeDiversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutEntreeDiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
