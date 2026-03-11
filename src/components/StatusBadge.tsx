import { JobStatus, JOB_STATUSES } from '@/types/job';

interface Props {
  status: JobStatus;
}

export default function StatusBadge({ status }: Props) {
  const config = JOB_STATUSES.find((s) => s.value === status)!;
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}
