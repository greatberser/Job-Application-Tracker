'use client';

import { useState } from 'react';
import { useJobStore } from '@/store/jobStore';
import { JOB_STATUSES, JobStatus } from '@/types/job';

export default function AddJobForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'applied' as JobStatus,
    appliedDate: new Date().toISOString().split('T')[0],
    deadline: '',
    notes: '',
    link: '',
  });

  // ← Zustand: grab only the action we need
  const addJob = useJobStore((state) => state.addJob);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addJob({
      ...form,
      deadline: form.deadline || undefined,
      notes: form.notes || undefined,
      link: form.link || undefined,
    });
    setOpen(false);
    setForm({
      company: '',
      role: '',
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0],
      deadline: '',
      notes: '',
      link: '',
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
      >
        + Add Job
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">New Application</h2>
          <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
        </div>

        <Field label="Company *">
          <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={input} />
        </Field>

        <Field label="Role *">
          <input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={input} />
        </Field>

        <Field label="Status">
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as JobStatus })} className={input}>
            {JOB_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Applied Date *">
            <input required type="date" value={form.appliedDate} onChange={(e) => setForm({ ...form, appliedDate: e.target.value })} className={input} />
          </Field>
          <Field label="Deadline">
            <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className={input} />
          </Field>
        </div>

        <Field label="Job Link">
          <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." className={input} />
        </Field>

        <Field label="Notes">
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className={input} />
        </Field>

        <div className="flex gap-2 pt-1">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Add Application
          </button>
          <button type="button" onClick={() => setOpen(false)} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// small helpers to keep JSX clean
const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}
