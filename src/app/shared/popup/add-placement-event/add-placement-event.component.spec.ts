import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlacementEventComponent } from './add-placement-event.component';

describe('AddPlacementEventComponent', () => {
  let component: AddPlacementEventComponent;
  let fixture: ComponentFixture<AddPlacementEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlacementEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlacementEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
