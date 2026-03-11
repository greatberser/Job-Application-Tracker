export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  appliedDate: string; // ISO date string
  deadline?: string;   // ISO date string
  notes?: string;
  link?: string;
}

export const JOB_STATUSES: { value: JobStatus; label: string; color: string }[] = [
  { value: 'applied',   label: 'Applied',    color: 'bg-blue-100 text-blue-800' },
  { value: 'interview', label: 'Interview',  color: 'bg-yellow-100 text-yellow-800' },
  { value: 'offer',     label: 'Offer',      color: 'bg-green-100 text-green-800' },
  { value: 'rejected',  label: 'Rejected',   color: 'bg-red-100 text-red-800' },
];
