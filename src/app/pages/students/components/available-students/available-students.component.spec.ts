import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableStudentsComponent } from './available-students.component';

describe('AvailableStudentsComponent', () => {
  let component: AvailableStudentsComponent;
  let fixture: ComponentFixture<AvailableStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
