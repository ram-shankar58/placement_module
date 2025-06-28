import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalTrainingsComponent } from './historical-trainings.component';

describe('HistoricalTrainingsComponent', () => {
  let component: HistoricalTrainingsComponent;
  let fixture: ComponentFixture<HistoricalTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricalTrainingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
