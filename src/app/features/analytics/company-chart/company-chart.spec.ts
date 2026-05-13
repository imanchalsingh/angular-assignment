import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyChart } from './company-chart';

describe('CompanyChart', () => {
  let component: CompanyChart;
  let fixture: ComponentFixture<CompanyChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyChart],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
