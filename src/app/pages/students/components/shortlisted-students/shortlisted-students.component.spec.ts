import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistedStudentsComponent } from './shortlisted-students.component';

describe('ShortlistedStudentsComponent', () => {
  let component: ShortlistedStudentsComponent;
  let fixture: ComponentFixture<ShortlistedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShortlistedStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortlistedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
