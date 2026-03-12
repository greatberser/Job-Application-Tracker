import { create } from 'zustand';
import { Job, JobStatus } from '@/types/job';
import { fetchJobs, createJob, editJob, removeJob } from '@/services/jobService';

interface JobStore {
  jobs: Job[];
  loading: boolean;
  loadJobs: () => Promise<void>;
  addJob: (job: Omit<Job, 'id'>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateJob: (id: string, updates: Partial<Job>) => Promise<void>;
  setStatus: (id: string, status: JobStatus) => Promise<void>;
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  loading: false,

  loadJobs: async () => {
    set({ loading: true });
    const jobs = await fetchJobs();
    set({ jobs, loading: false });
  },

  // optimistic update: update UI immediately, then sync to Firestore
  addJob: async (job) => {
    const newJob = await createJob(job);
    set((state) => ({ jobs: [newJob, ...state.jobs] }));
  },

  deleteJob: async (id) => {
    set((state) => ({ jobs: state.jobs.filter((j) => j.id !== id) }));
    await removeJob(id);
  },

  updateJob: async (id, updates) => {
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
    }));
    await editJob(id, updates);
  },

  setStatus: async (id, status) => {
    get().updateJob(id, { status });
  },
}));
