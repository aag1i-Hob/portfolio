"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/admin/dashboard");
    } catch {
      toast.error("Нэвтрэх мэдээлэл буруу байна.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.12) 0%, transparent 60%), var(--bg)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: 24,
            }}
          >
            🔐
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Admin Panel
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            Portfolio удирдлагын систем
          </p>
        </div>

        {/* Form */}
        <div
          className="card"
          style={{ padding: 32 }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--muted)",
                  marginBottom: 8,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Имэйл
              </label>
              <input
                className="input"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--muted)",
                  marginBottom: 8,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Нууц үг
              </label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: "100%", opacity: loading ? 0.7 : 1, marginTop: 8 }}
            >
              {loading ? "Нэвтэрч байна..." : "Нэвтрэх →"}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          <a
            href="/"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            ← Нийтийн хуудас руу буцах
          </a>
        </p>
      </div>
    </div>
  );
}
