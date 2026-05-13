import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsHome } from './analytics-home';

describe('AnalyticsHome', () => {
  let component: AnalyticsHome;
  let fixture: ComponentFixture<AnalyticsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsHome],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
