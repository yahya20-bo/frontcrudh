import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSortieDiversComponent } from './ajout-sortie-divers.component';

describe('AjoutSortieDiversComponent', () => {
  let component: AjoutSortieDiversComponent;
  let fixture: ComponentFixture<AjoutSortieDiversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutSortieDiversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutSortieDiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
