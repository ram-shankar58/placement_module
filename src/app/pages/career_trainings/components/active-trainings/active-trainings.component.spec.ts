import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTrainingsComponent } from './active-trainings.component';

describe('ActiveTrainingsComponent', () => {
  let component: ActiveTrainingsComponent;
  let fixture: ComponentFixture<ActiveTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveTrainingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
