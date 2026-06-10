import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from './config';

// ── helpers ──────────────────────────────────────────────────────────────────

function userRef(uid) {
  return doc(db, 'users', uid);
}

function operationsRef(uid) {
  return collection(db, 'users', uid, 'operations');
}

// ── operations ───────────────────────────────────────────────────────────────

export async function getOperations(uid) {
  const q = query(operationsRef(uid), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addOperation(uid, operation) {
  const result = await addDoc(operationsRef(uid), {
    ...operation,
    createdAt: serverTimestamp(),
  });

  // If it's a savings deposit, increment savedAmount in the goal automatically
  if (operation.category === 'Oszczędności' && operation.amount > 0) {
    await setDoc(
      doc(userRef(uid), 'savingsGoal', 'data'),
      { savedAmount: increment(operation.amount) },
      { merge: true }
    );
  }

  return result;
}

export async function deleteOperation(uid, operationId) {
  return deleteDoc(doc(db, 'users', uid, 'operations', operationId));
}

// ── profile ───────────────────────────────────────────────────────────────────

export async function getProfile(uid) {
  const snap = await getDoc(doc(userRef(uid), 'profile', 'data'));
  return snap.exists() ? snap.data() : { firstName: '', lastName: '' };
}

export async function saveProfile(uid, profile) {
  return setDoc(doc(userRef(uid), 'profile', 'data'), profile, { merge: true });
}

// ── savings goal ──────────────────────────────────────────────────────────────

export async function getSavingsGoal(uid) {
  const snap = await getDoc(doc(userRef(uid), 'savingsGoal', 'data'));
  return snap.exists()
    ? snap.data()
    : {
        title: 'Oszczędności na wakacje',
        targetAmount: 12000,
        savedAmount: 0,
        monthlyContribution: 500,
        deadline: '',
      };
}

export async function saveSavingsGoal(uid, goal) {
  return setDoc(doc(userRef(uid), 'savingsGoal', 'data'), goal, { merge: true });
}
