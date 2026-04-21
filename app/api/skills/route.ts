import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snap = await adminDb.collection("skills").orderBy("order", "asc").get();
    return NextResponse.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const ref = await adminDb.collection("skills").add(data);
    return NextResponse.json({ id: ref.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
