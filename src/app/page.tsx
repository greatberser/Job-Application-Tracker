'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JOB_STATUSES, JobStatus } from '@/types/job';
import { useJobStore } from '@/store/jobStore';
import { useAuthStore } from '@/store/authStore';
import JobCard from '@/components/JobCard';
import AddJobForm from '@/components/AddJobForm';

export default function Home() {
  const jobs = useJobStore((state) => state.jobs);
  const loading = useJobStore((state) => state.loading);
  const loadJobs = useJobStore((state) => state.loadJobs);
  const { user, signOutUser } = useAuthStore();

  const searchParams = useSearchParams();
  const router = useRouter();
  const activeStatus = searchParams.get('status') as JobStatus | null;

  function setFilter(status: JobStatus | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (status) params.set('status', status);
    else params.delete('status');
    router.replace(`?${params.toString()}`);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const visibleStatuses = activeStatus
    ? JOB_STATUSES.filter((s) => s.value === activeStatus)
    : JOB_STATUSES;

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">{jobs.length} applications tracked</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 hidden sm:block">{user?.displayName}</span>
          <AddJobForm />
          <button
            onClick={signOutUser}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !activeStatus ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        {JOB_STATUSES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeStatus === value ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleStatuses.map(({ value, label }) => {
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
