import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTimepickerComponent } from './custom-timepicker.component';

describe('CustomTimepickerComponent', () => {
  let component: CustomTimepickerComponent;
  let fixture: ComponentFixture<CustomTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTimepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
