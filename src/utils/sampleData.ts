import { Job } from '@/types/job';

export const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    company: 'Stripe',
    role: 'Senior Frontend Engineer',
    status: 'interview',
    appliedDate: '2026-02-28',
    deadline: '2026-03-15',
    notes: 'Referral from Jane. Technical screen scheduled for March 12.',
    link: 'https://stripe.com/jobs',
  },
  {
    id: '2',
    company: 'Linear',
    role: 'Product Engineer',
    status: 'applied',
    appliedDate: '2026-03-05',
    notes: 'Applied via website. Great design culture.',
  },
  {
    id: '3',
    company: 'Vercel',
    role: 'DX Engineer',
    status: 'offer',
    appliedDate: '2026-02-10',
    notes: 'Offer received: $180k + equity.',
  },
  {
    id: '4',
    company: 'Meta',
    role: 'Software Engineer E5',
    status: 'rejected',
    appliedDate: '2026-01-20',
    notes: 'Failed system design round.',
  },
];
