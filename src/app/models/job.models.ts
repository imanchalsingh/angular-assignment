export interface Job {
  id: string;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  jobType: 'Full-Time' | 'Internship' | 'Remote' | 'Part-Time';
  location: string;
  salary?: string;
  appliedDate: string;
  notes?: string;
}