"use client";

import { useEffect, useState } from "react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/lib/db";
import type { Skill } from "@/types";
import toast from "react-hot-toast";

const EMPTY: Omit<Skill, "id"> = {
  name: "", level: 80, category: "Frontend", order: 0,
};

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setSkills(await getSkills());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ ...EMPTY }); setEditing(null); setIsNew(true); };
  const openEdit = (s: Skill) => {
    setForm({ name: s.name, level: s.level, category: s.category, order: s.order });
    setEditing(s); setIsNew(false);
  };
  const close = () => { setEditing(null); setIsNew(false); };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Нэр оруулна уу"); return; }
    setSaving(true);
    try {
      if (isNew) { await createSkill(form); toast.success("Нэмэгдлээ!"); }
      else if (editing) { await updateSkill(editing.id, form); toast.success("Хадгалагдлаа!"); }
      await load();
      close();
    } catch { toast.error("Алдаа гарлаа"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Устгах уу?")) return;
    try { await deleteSkill(id); toast.success("Устгагдлаа"); await load(); }
    catch { toast.error("Алдаа гарлаа"); }
  };

  // Group by category
  const groups = skills.reduce((acc, s) => {
    const c = s.category || "Other";
    if (!acc[c]) acc[c] = [];
    acc[c].push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800 }}>Ур Чадварууд</h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>{skills.length} ур чадвар</p>
        </div>
        <button className="btn-primary" onClick={openNew}>+ Нэмэх</button>
      </div>

      {/* Form modal */}
      {(isNew || editing) && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }}>
                {isNew ? "Шинэ ур чадвар" : "Засах"}
              </h2>
              <button onClick={close} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelSt}>Нэр *</label>
                <input className="input" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="React, TypeScript..."
                />
              </div>
              <div>
                <label style={labelSt}>Категори</label>
                <input className="input" value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Frontend, Backend, Tools..."
                />
              </div>
              <div>
                <label style={labelSt}>Түвшин: {form.level}%</label>
                <input type="range" min={0} max={100} value={form.level}
                  onChange={(e) => setForm({ ...form, level: +e.target.value })}
                  style={{ width: "100%", accentColor: "var(--accent)", cursor: "pointer" }}
                />
                <div style={{ height: 8, background: "var(--surface-2)", borderRadius: 4, overflow: "hidden", marginTop: 8 }}>
                  <div style={{ height: "100%", width: `${form.level}%`, background: "linear-gradient(90deg, var(--accent), var(--accent-2))", borderRadius: 4, transition: "width 0.2s" }} />
                </div>
              </div>
              <div>
                <label style={labelSt}>Дараалал</label>
                <input className="input" type="number" value={form.order}
                  onChange={(e) => setForm({ ...form, order: +e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={close}>Цуцлах</button>
              <button className="btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills grouped list */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1,2,3].map(i => <div key={i} style={{ height: 60, background: "var(--surface)", borderRadius: 12 }} />)}
        </div>
      ) : skills.length === 0 ? (
        <div style={{ textAlign: "center", padding: 80, color: "var(--muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
          <p>Ур чадвар байхгүй байна.</p>
          <button className="btn-primary" onClick={openNew} style={{ marginTop: 20 }}>Эхнийг нэмэх</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {Object.entries(groups).map(([cat, catSkills]) => (
            <div key={cat}>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                {cat}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {catSkills.map((s) => (
                  <div key={s.id} className="card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{s.level}%</span>
                      </div>
                      <div style={{ height: 6, background: "var(--surface-2)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${s.level}%`, background: "linear-gradient(90deg, var(--accent), var(--accent-2))", borderRadius: 3 }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <button onClick={() => openEdit(s)} className="btn-ghost" style={{ padding: "6px 14px", fontSize: 12 }}>Засах</button>
                      <button onClick={() => handleDelete(s.id)}
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "6px 14px", borderRadius: 50, fontSize: 12, cursor: "pointer" }}>
                        Устгах
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const labelSt: React.CSSProperties = {
  display: "block", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)",
  marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase",
};
