import { JOB_STATUSES } from '@/types/job';
import { SAMPLE_JOBS } from '@/utils/sampleData';
import JobCard from '@/components/JobCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Job Tracker</h1>
        <p className="text-sm text-gray-500 mt-1">
          {SAMPLE_JOBS.length} applications tracked
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {JOB_STATUSES.map(({ value, label }) => {
          const jobs = SAMPLE_JOBS.filter((j) => j.status === value);
          return (
            <div key={value} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {label}
                </h2>
                <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">
                  {jobs.length}
                </span>
              </div>
              {jobs.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No applications</p>
              ) : (
                jobs.map((job) => <JobCard key={job.id} job={job} />)
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
