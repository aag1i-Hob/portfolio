"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Мессеж амжилттай илгээгдлээ!");
      setForm({ name: "", email: "", subject: "", body: "" });
    } catch {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="section-label">// Холбоо барих</p>
          <h2 className="section-title">
            Ярилцацгаая
          </h2>
          <p
            style={{
              color: "var(--muted)",
              marginTop: 16,
              fontSize: 16,
              lineHeight: 1.7,
            }}
          >
            Санал, хамтарч ажиллах хүсэл эсвэл зүгээр л мэндчилгээ — бүх
            мессежийг тавтай морилно.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Нэр</label>
              <input
                className="input"
                type="text"
                placeholder="Таны нэр"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Имэйл</label>
              <input
                className="input"
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Сэдэв</label>
            <input
              className="input"
              type="text"
              placeholder="Юуны тухай?"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Мессеж</label>
            <textarea
              className="input"
              rows={6}
              placeholder="Дэлгэрэнгүй бичнэ үү..."
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              required
              style={{ resize: "vertical" }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ alignSelf: "flex-end", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Илгээж байна..." : "Мессеж илгээх →"}
          </button>
        </form>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontFamily: "var(--font-mono)",
  color: "var(--muted)",
  marginBottom: 8,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};
