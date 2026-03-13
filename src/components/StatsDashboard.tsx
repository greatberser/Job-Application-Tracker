'use client';

import { Job } from '@/types/job';

interface Props {
  jobs: Job[];
}

export default function StatsDashboard({ jobs }: Props) {
  const total = jobs.length;
  const responded = jobs.filter((j) => j.status !== 'applied').length;
  const interviews = jobs.filter((j) => j.status === 'interview').length;
  const offers = jobs.filter((j) => j.status === 'offer').length;
  const responseRate = total === 0 ? 0 : Math.round((responded / total) * 100);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <StatCard label="Total Applied" value={total} />
      <StatCard label="Response Rate" value={`${responseRate}%`} />
      <StatCard label="Interviews" value={interviews} />
      <StatCard label="Offers" value={offers} highlight={offers > 0} />
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-white border rounded-xl p-4 ${highlight ? 'border-green-200' : 'border-gray-200'}`}>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${highlight ? 'text-green-600' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  );
}
