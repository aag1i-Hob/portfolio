"use client";

import { useEffect, useState } from "react";
import { getProjects, getSkills, getMessages } from "@/lib/db";
import type { SiteStats } from "@/types";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [projects, skills, messages] = await Promise.all([
        getProjects(),
        getSkills(),
        getMessages(),
      ]);
      setStats({
        totalProjects: projects.length,
        totalSkills: skills.length,
        totalMessages: messages.length,
        unreadMessages: messages.filter((m) => !m.read).length,
      });
      setLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          Dashboard
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          Portfolio сайтын тойм
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        {[
          {
            label: "Нийт Проект",
            value: stats?.totalProjects ?? "—",
            icon: "🚀",
            href: "/admin/projects",
            color: "#6c63ff",
          },
          {
            label: "Ур Чадвар",
            value: stats?.totalSkills ?? "—",
            icon: "⚡",
            href: "/admin/skills",
            color: "#22c55e",
          },
          {
            label: "Нийт Мессеж",
            value: stats?.totalMessages ?? "—",
            icon: "💬",
            href: "/admin/messages",
            color: "#f59e0b",
          },
          {
            label: "Уншаагүй",
            value: stats?.unreadMessages ?? "—",
            icon: "🔴",
            href: "/admin/messages",
            color: "#ff6584",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            style={{ textDecoration: "none" }}
          >
            <div
              className="card"
              style={{ padding: 24 }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{stat.icon}</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  fontWeight: 800,
                  color: stat.color,
                  marginBottom: 4,
                }}
              >
                {loading ? (
                  <div
                    style={{
                      width: 48,
                      height: 36,
                      background: "var(--surface-2)",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  stat.value
                )}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {stat.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Хурдан үйлдэл
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/admin/projects?new=1" className="btn-primary">
            + Проект нэмэх
          </Link>
          <Link href="/admin/skills?new=1" className="btn-ghost">
            + Ур чадвар нэмэх
          </Link>
          <Link href="/admin/messages" className="btn-ghost">
            Мессежүүд харах
          </Link>
        </div>
      </div>

      {/* Footer note */}
      <div
        style={{
          padding: 20,
          background: "rgba(108,99,255,0.05)",
          border: "1px solid rgba(108,99,255,0.15)",
          borderRadius: 12,
          fontSize: 13,
          color: "var(--muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        💡 Зөвлөгөө: Firebase консол дээр нийтийн хуудсын нэвтрэх эрхийг
        зөвхөн и-мэйл/нууц үгээр хязгаарлаарай.
      </div>
    </div>
  );
}
