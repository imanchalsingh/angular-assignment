import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Interview {
  id: string;
  jobId: string;
  company: string;
  position: string;
  date: string;
  time: string;
  type: 'phone' | 'video' | 'in-person';
  notes?: string;
  interviewer?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  private storageKey = 'job-tracker-interviews';
  private interviewsSubject = new BehaviorSubject<Interview[]>(this.loadInterviews());
  interviews$ = this.interviewsSubject.asObservable();

  constructor() {}

  getInterviews(): Interview[] {
    return this.interviewsSubject.value;
  }

  getInterviewById(id: string): Interview | undefined {
    return this.getInterviews().find(i => i.id === id);
  }

  addInterview(interview: Interview): void {
    const interviews = [...this.getInterviews(), interview];
    this.updateState(interviews);
  }

  updateInterview(interview: Interview): void {
    const interviews = this.getInterviews().map(i =>
      i.id === interview.id ? interview : i
    );
    this.updateState(interviews);
  }

  deleteInterview(id: string): void {
    const interviews = this.getInterviews().filter(i => i.id !== id);
    this.updateState(interviews);
  }

  getUpcomingInterviews(): Interview[] {
    const today = new Date();
    return this.getInterviews().filter(
      i => new Date(`${i.date}T${i.time}`) > today && i.status === 'scheduled'
    );
  }

  private updateState(interviews: Interview[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(interviews));
    this.interviewsSubject.next(interviews);
  }

  private loadInterviews(): Interview[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
}
