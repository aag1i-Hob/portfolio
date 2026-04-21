"use client";

import { useEffect, useState } from "react";
import { getMessages, markMessageRead, deleteMessage } from "@/lib/db";
import type { Message } from "@/types";
import toast from "react-hot-toast";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = async () => {
    setLoading(true);
    setMessages(await getMessages());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const open = async (m: Message) => {
    setSelected(m);
    if (!m.read) {
      await markMessageRead(m.id);
      setMessages((prev) => prev.map((msg) => msg.id === m.id ? { ...msg, read: true } : msg));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Устгах уу?")) return;
    try {
      await deleteMessage(id);
      toast.success("Устгагдлаа");
      setSelected(null);
      await load();
    } catch { toast.error("Алдаа гарлаа"); }
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800 }}>Мессежүүд</h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
          {messages.length} нийт · {unread} уншаагүй
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 20 }}>
        {/* Message list */}
        <div>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[1,2,3].map(i => <div key={i} style={{ height: 80, background: "var(--surface)", borderRadius: 12 }} />)}
            </div>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: "center", padding: 80, color: "var(--muted)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
              <p>Одоохондоо мессеж байхгүй байна.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => open(m)}
                  className="card"
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    borderColor: selected?.id === m.id ? "var(--accent)" : "var(--border)",
                    background: !m.read ? "rgba(108,99,255,0.05)" : "var(--surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        {!m.read && (
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, display: "inline-block" }} />
                        )}
                        <span style={{ fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {m.name}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {m.subject}
                      </p>
                    </div>
                    <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", flexShrink: 0, whiteSpace: "nowrap" }}>
                      {new Date(m.createdAt).toLocaleDateString("mn-MN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message detail */}
        {selected && (
          <div className="card" style={{ padding: 28, position: "sticky", top: 20, maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{selected.subject}</h2>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>{selected.name} · {selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)}
                style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>

            <div style={{ padding: "16px 20px", background: "var(--surface-2)", borderRadius: 12, marginBottom: 20, lineHeight: 1.8, fontSize: 14, color: "var(--text)" }}>
              {selected.body}
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary" style={{ fontSize: 13 }}>
                Хариу илгээх ↗
              </a>
              <button onClick={() => handleDelete(selected.id)}
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "10px 18px", borderRadius: 50, fontSize: 13, cursor: "pointer" }}>
                Устгах
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
