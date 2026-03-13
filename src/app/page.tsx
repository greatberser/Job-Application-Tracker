'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JOB_STATUSES, JobStatus } from '@/types/job';
import { useJobStore } from '@/store/jobStore';
import { useAuthStore } from '@/store/authStore';
import JobCard from '@/components/JobCard';
import EmptyColumn from '@/components/EmptyColumn';
import AddJobForm from '@/components/AddJobForm';
import StatsDashboard from '@/components/StatsDashboard';
import SkeletonBoard from '@/components/SkeletonBoard';
import { exportToCsv } from '@/utils/exportCsv';

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
    if (user) loadJobs(user.uid);
  }, [user]);

  const visibleStatuses = activeStatus
    ? JOB_STATUSES.filter((s) => s.value === activeStatus)
    : JOB_STATUSES;

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-40 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
              <div className="h-2.5 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-7 w-10 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <SkeletonBoard />
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
          <button
            onClick={() => exportToCsv(jobs)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Export CSV
          </button>
          <AddJobForm />
          <button
            onClick={signOutUser}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <StatsDashboard jobs={jobs} />

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
            <div key={value} className="flex flex-col gap-3 min-h-0">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {label}
                </h2>
                <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">
                  {col.length}
                </span>
              </div>
              <div className="overflow-y-auto max-h-[calc(95vh-280px)] flex flex-col gap-3 pr-1">
                {col.length === 0 ? (
                  <EmptyColumn />
                ) : (
                  col.map((job) => <JobCard key={job.id} job={job} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
