import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedStudentsComponent } from './placed-students.component';

describe('PlacedStudentsComponent', () => {
  let component: PlacedStudentsComponent;
  let fixture: ComponentFixture<PlacedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlacedStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
