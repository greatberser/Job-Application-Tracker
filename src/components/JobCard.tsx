import { Job } from '@/types/job';
import StatusBadge from './StatusBadge';

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  const deadlineSoon =
    job.deadline &&
    new Date(job.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">{job.company}</p>
          <h3 className="font-semibold text-gray-900">{job.role}</h3>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="mt-3 text-xs text-gray-500 space-y-1">
        <p>Applied: {new Date(job.appliedDate).toLocaleDateString()}</p>
        {job.deadline && (
          <p className={deadlineSoon ? 'text-orange-600 font-medium' : ''}>
            Deadline: {new Date(job.deadline).toLocaleDateString()}
            {deadlineSoon && ' ⚠️'}
          </p>
        )}
      </div>

      {job.notes && (
        <p className="mt-3 text-sm text-gray-600 border-t border-gray-100 pt-2 line-clamp-2">
          {job.notes}
        </p>
      )}

      {job.link && (
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-blue-600 hover:underline"
        >
          View posting →
        </a>
      )}
    </div>
  );
}
