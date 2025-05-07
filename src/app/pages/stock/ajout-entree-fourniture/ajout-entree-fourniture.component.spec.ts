import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEntreeFournitureComponent } from './ajout-entree-fourniture.component';

describe('AjoutEntreeFournitureComponent', () => {
  let component: AjoutEntreeFournitureComponent;
  let fixture: ComponentFixture<AjoutEntreeFournitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutEntreeFournitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutEntreeFournitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
