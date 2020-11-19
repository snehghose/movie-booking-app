import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTheatresComponent } from './manage-theatres.component';

describe('ManageTheatresComponent', () => {
  let component: ManageTheatresComponent;
  let fixture: ComponentFixture<ManageTheatresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTheatresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTheatresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
