import { Job } from '@/types/job';

export function exportToCsv(jobs: Job[]) {
  const headers = ['Company', 'Role', 'Status', 'Applied Date', 'Deadline', 'Notes', 'Link'];

  const rows = jobs.map((j) => [
    j.company,
    j.role,
    j.status,
    j.appliedDate,
    j.deadline ?? '',
    j.notes ?? '',
    j.link ?? '',
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jobs-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
