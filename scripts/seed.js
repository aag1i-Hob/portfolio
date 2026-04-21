#!/usr/bin/env node
/**
 * Firebase Seed Script
 * Run: node scripts/seed.js
 * Requires: FIREBASE_ADMIN_* env vars in .env.local
 */

require("dotenv").config({ path: ".env.local" });
const admin = require("firebase-admin");

// Initialize
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

async function seed() {
  console.log("🌱 Seeding Firestore...\n");

  // Profile
  await db.collection("config").doc("profile").set({
    name: "Taны Нэр",
    title: "Full-Stack Developer",
    bio: "Би Next.js, React болон Node.js ашиглан өндөр чанарын веб аппликейшн хөгжүүлдэг.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    email: "your@email.com",
    location: "Улаанбаатар, Монгол",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    resumeUrl: "",
  });
  console.log("✅ Profile created");

  // Projects
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Next.js болон Stripe ашиглан хийсэн бүрэн онлайн дэлгүүр.",
      longDescription: "Энэ нь бүрэн функциональ e-commerce платформ бөгөөд хэрэглэгчийн нэвтрэлт, бараа удирдлага, захиалга боловсруулалт зэргийг агуулдаг.",
      techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind"],
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/project",
      featured: true,
      order: 1,
      category: "Web",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    {
      title: "Task Manager App",
      description: "Real-time task менежментийн апп React болон Firebase ашиглан.",
      longDescription: "Команд болон ганцаараа ажиллах зориулалттай task менежментийн апп.",
      techStack: ["React", "Firebase", "Framer Motion", "CSS Modules"],
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/tasks",
      featured: true,
      order: 2,
      category: "Web",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    {
      title: "AI Chat Interface",
      description: "OpenAI API ашиглан бүтээсэн дэвшилтэт чат интерфейс.",
      longDescription: "GPT-4 дээр суурилсан чат апп бөгөөд олон яриа, markdown дэмжлэг, code highlighting агуулдаг.",
      techStack: ["Next.js", "OpenAI API", "WebSocket", "Redis"],
      imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/ai-chat",
      featured: true,
      order: 3,
      category: "AI",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
  ];

  for (const p of projects) {
    await db.collection("projects").add(p);
  }
  console.log("✅ Projects created:", projects.length);

  // Skills
  const skills = [
    { name: "React / Next.js", level: 92, category: "Frontend", order: 1 },
    { name: "TypeScript", level: 88, category: "Frontend", order: 2 },
    { name: "CSS / Tailwind", level: 85, category: "Frontend", order: 3 },
    { name: "Node.js", level: 85, category: "Backend", order: 4 },
    { name: "Firebase / Firestore", level: 82, category: "Backend", order: 5 },
    { name: "PostgreSQL", level: 75, category: "Backend", order: 6 },
    { name: "Docker", level: 70, category: "DevOps", order: 7 },
    { name: "Git / GitHub", level: 90, category: "DevOps", order: 8 },
  ];

  for (const s of skills) {
    await db.collection("skills").add(s);
  }
  console.log("✅ Skills created:", skills.length);

  console.log("\n🎉 Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
