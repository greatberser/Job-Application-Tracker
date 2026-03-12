'use client';

import { useEffect } from 'react';
import { JOB_STATUSES } from '@/types/job';
import { useJobStore } from '@/store/jobStore';
import JobCard from '@/components/JobCard';
import AddJobForm from '@/components/AddJobForm';

export default function Home() {
  const jobs = useJobStore((state) => state.jobs);
  const loading = useJobStore((state) => state.loading);
  const loadJobs = useJobStore((state) => state.loadJobs);

  useEffect(() => {
    loadJobs();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">
            {jobs.length} applications tracked
          </p>
        </div>
        <AddJobForm />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {JOB_STATUSES.map(({ value, label }) => {
          const col = jobs.filter((j) => j.status === value);
          return (
            <div key={value} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {label}
                </h2>
                <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">
                  {col.length}
                </span>
              </div>
              {col.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No applications</p>
              ) : (
                col.map((job) => <JobCard key={job.id} job={job} />)
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
