'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Job } from '@/types/job';
import JobCard from './JobCard';

export default function DraggableCard({ job }: { job: Job }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'}
      {...listeners}
      {...attributes}
    >
      <JobCard job={job} />
    </div>
  );
}
