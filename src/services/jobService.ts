import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  doc,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Job } from '@/types/job';

const COL = 'jobs';

export async function fetchJobs(userId: string): Promise<Job[]> {
  const q = query(
    collection(db, COL),
    where('userId', '==', userId),
    orderBy('appliedDate', 'desc')
  );
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
  const clean = Object.fromEntries(
    Object.entries(updates).map(([k, v]) => [k, v === undefined ? deleteField() : v])
  );
  await updateDoc(doc(db, COL, id), clean);
}

export async function removeJob(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
