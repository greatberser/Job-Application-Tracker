'use client';

import { useState } from 'react';
import JobFormModal from './JobFormModal';

export default function AddJobForm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
      >
        + Add Job
      </button>
      <JobFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
