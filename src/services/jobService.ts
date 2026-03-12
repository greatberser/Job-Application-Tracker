import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Job } from '@/types/job';

const COL = 'jobs';

// Firestore stores documents — each job is a document in the "jobs" collection.
// Documents don't have a fixed schema, but we enforce one via TypeScript.

export async function fetchJobs(): Promise<Job[]> {
  const q = query(collection(db, COL), orderBy('appliedDate', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Job));
}

export async function createJob(job: Omit<Job, 'id'>): Promise<Job> {
  const clean = Object.fromEntries(
    Object.entries(job).filter(([, v]) => v !== undefined)
  );
  const ref = await addDoc(collection(db, COL), clean);
  return { id: ref.id, ...job };
}

export async function editJob(id: string, updates: Partial<Job>): Promise<void> {
  await updateDoc(doc(db, COL, id), updates);
}

export async function removeJob(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
