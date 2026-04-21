"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/projects", label: "Проектүүд", icon: "🚀" },
  { href: "/admin/skills", label: "Ур чадвар", icon: "⚡" },
  { href: "/admin/messages", label: "Мессежүүд", icon: "💬" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin") {
      router.push("/admin");
    }
  }, [user, loading, pathname, router]);

  // Login page – no sidebar
  if (pathname === "/admin") return <>{children}</>;

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid var(--border)",
            borderTopColor: "var(--accent)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
        style={{ zIndex: 50 }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 18,
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 4,
            }}
          >
            Admin Panel
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.email}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname === item.href ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid var(--border)" }}>
          <Link
            href="/"
            className="admin-nav-item"
            style={{ marginBottom: 4 }}
          >
            <span style={{ fontSize: 18 }}>🌐</span>
            Сайтыг үзэх
          </Link>
          <button
            onClick={() => {
              signOut();
              router.push("/admin");
            }}
            className="admin-nav-item"
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              color: "var(--muted)",
            }}
          >
            <span style={{ fontSize: 18 }}>🚪</span>
            Гарах
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-content" style={{ flex: 1 }}>
        {/* Mobile header */}
        <div
          className="md:hidden"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            padding: "0 0 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text)",
              cursor: "pointer",
              fontSize: 22,
            }}
          >
            ☰
          </button>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Admin Panel
          </span>
          <div style={{ width: 32 }} />
        </div>

        {children}
      </main>
    </div>
  );
}
