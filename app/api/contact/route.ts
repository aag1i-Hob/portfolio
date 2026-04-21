import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, body } = await req.json();

    if (!name || !email || !subject || !body) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    await adminDb.collection("messages").add({
      name,
      email,
      subject,
      body,
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
