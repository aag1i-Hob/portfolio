import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Project, Skill, Message, Profile } from "@/types";

// ── Projects ──────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const q = query(
    collection(db, "projects"),
    where("featured", "==", true),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
}

export async function getProject(id: string): Promise<Project | null> {
  const snap = await getDoc(doc(db, "projects", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Project;
}

export async function createProject(
  data: Omit<Project, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const ref = await addDoc(collection(db, "projects"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProject(
  id: string,
  data: Partial<Project>
): Promise<void> {
  await updateDoc(doc(db, "projects", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

// ── Skills ────────────────────────────────────────────────
export async function getSkills(): Promise<Skill[]> {
  const q = query(collection(db, "skills"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Skill));
}

export async function createSkill(
  data: Omit<Skill, "id">
): Promise<string> {
  const ref = await addDoc(collection(db, "skills"), data);
  return ref.id;
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<void> {
  await updateDoc(doc(db, "skills", id), data);
}

export async function deleteSkill(id: string): Promise<void> {
  await deleteDoc(doc(db, "skills", id));
}

// ── Messages ──────────────────────────────────────────────
export async function getMessages(): Promise<Message[]> {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : data.createdAt,
    } as Message;
  });
}

export async function createMessage(
  data: Omit<Message, "id" | "read" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(db, "messages"), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function markMessageRead(id: string): Promise<void> {
  await updateDoc(doc(db, "messages", id), { read: true });
}

export async function deleteMessage(id: string): Promise<void> {
  await deleteDoc(doc(db, "messages", id));
}

// ── Profile ───────────────────────────────────────────────
export async function getProfile(): Promise<Profile | null> {
  const snap = await getDoc(doc(db, "config", "profile"));
  if (!snap.exists()) return null;
  return snap.data() as Profile;
}

export async function updateProfile(data: Partial<Profile>): Promise<void> {
  await updateDoc(doc(db, "config", "profile"), data);
}
