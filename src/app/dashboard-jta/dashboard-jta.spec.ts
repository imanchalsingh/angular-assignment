import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardJta } from './dashboard-jta';

describe('DashboardJta', () => {
  let component: DashboardJta;
  let fixture: ComponentFixture<DashboardJta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardJta],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardJta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
