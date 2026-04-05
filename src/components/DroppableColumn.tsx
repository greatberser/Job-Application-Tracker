'use client';

import { useDroppable } from '@dnd-kit/core';
import { JobStatus } from '@/types/job';

interface Props {
  status: JobStatus;
  children: React.ReactNode;
}

export default function DroppableColumn({ status, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-3 min-h-[100px] rounded-xl transition-colors ${
        isOver ? 'bg-blue-50' : ''
      }`}
    >
      {children}
    </div>
  );
}
