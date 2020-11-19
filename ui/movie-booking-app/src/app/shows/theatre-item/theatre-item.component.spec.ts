import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreItemComponent } from './theatre-item.component';

describe('TheatreItemComponent', () => {
  let component: TheatreItemComponent;
  let fixture: ComponentFixture<TheatreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatreItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
