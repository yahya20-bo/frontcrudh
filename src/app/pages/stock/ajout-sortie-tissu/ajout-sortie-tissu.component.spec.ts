import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSortieTissuComponent } from './ajout-sortie-tissu.component';

describe('AjoutSortieTissuComponent', () => {
  let component: AjoutSortieTissuComponent;
  let fixture: ComponentFixture<AjoutSortieTissuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutSortieTissuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutSortieTissuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
