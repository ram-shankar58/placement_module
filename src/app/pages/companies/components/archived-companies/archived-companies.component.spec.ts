import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedCompaniesComponent } from './archived-companies.component';

describe('ArchivedCompaniesComponent', () => {
  let component: ArchivedCompaniesComponent;
  let fixture: ComponentFixture<ArchivedCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedCompaniesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
