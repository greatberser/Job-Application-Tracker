import { create } from 'zustand';
import { Job, JobStatus } from '@/types/job';
import { SAMPLE_JOBS } from '@/utils/sampleData';

interface JobStore {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id'>) => void;
  deleteJob: (id: string) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  setStatus: (id: string, status: JobStatus) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: SAMPLE_JOBS,

  addJob: (job) =>
    set((state) => ({
      jobs: [...state.jobs, { ...job, id: crypto.randomUUID() }],
    })),

  deleteJob: (id) =>
    set((state) => ({
      jobs: state.jobs.filter((j) => j.id !== id),
    })),

  updateJob: (id, updates) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
    })),

  setStatus: (id, status) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, status } : j)),
    })),
}));
