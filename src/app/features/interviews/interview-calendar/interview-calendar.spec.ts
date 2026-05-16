import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCalendar } from './interview-calendar';

describe('InterviewCalendar', () => {
  let component: InterviewCalendar;
  let fixture: ComponentFixture<InterviewCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
