import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function GET() {
  try {
    const snap = await adminDb
      .collection("projects")
      .orderBy("order", "asc")
      .get();
    const projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const ref = await adminDb.collection("projects").add({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ id: ref.id });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
