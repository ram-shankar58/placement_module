import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendedInterviewStudentsComponent } from './attended-interview-students.component';

describe('AttendedInterviewStudentsComponent', () => {
  let component: AttendedInterviewStudentsComponent;
  let fixture: ComponentFixture<AttendedInterviewStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendedInterviewStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendedInterviewStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
