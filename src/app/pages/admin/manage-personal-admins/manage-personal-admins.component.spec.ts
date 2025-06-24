import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePersonalAdminsComponent } from './manage-personal-admins.component';

describe('ManagePersonalAdminsComponent', () => {
  let component: ManagePersonalAdminsComponent;
  let fixture: ComponentFixture<ManagePersonalAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePersonalAdminsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePersonalAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
