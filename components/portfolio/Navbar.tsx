"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Profile } from "@/types";

export default function Navbar({ profile }: { profile: Profile | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s",
        background: scrolled
          ? "rgba(10,10,15,0.9)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 22,
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {profile?.name?.split(" ")[0] ?? "Portfolio"}
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{ gap: 8, alignItems: "center" }}
        >
          {["About", "Projects", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              {item}
            </a>
          ))}
          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ fontSize: 13 }}
            >
              Resume ↗
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text)",
            cursor: "pointer",
            fontSize: 22,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {["About", "Projects", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                padding: "12px 16px",
                borderRadius: 8,
                fontSize: 15,
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
