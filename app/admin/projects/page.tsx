"use client";

import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/db";
import type { Project } from "@/types";
import toast from "react-hot-toast";

const EMPTY: Omit<Project, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  description: "",
  longDescription: "",
  techStack: [],
  imageUrl: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  order: 0,
  category: "Web",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState("");

  const load = async () => {
    setLoading(true);
    setProjects(await getProjects());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setForm({ ...EMPTY });
    setTechInput("");
    setEditing(null);
    setIsNew(true);
  };

  const openEdit = (p: Project) => {
    setForm({
      title: p.title, description: p.description,
      longDescription: p.longDescription ?? "",
      techStack: p.techStack, imageUrl: p.imageUrl,
      liveUrl: p.liveUrl ?? "", githubUrl: p.githubUrl ?? "",
      featured: p.featured, order: p.order, category: p.category,
    });
    setTechInput(p.techStack.join(", "));
    setEditing(p);
    setIsNew(false);
  };

  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Гарчиг оруулна уу"); return; }
    setSaving(true);
    try {
      const data = { ...form, techStack: techInput.split(",").map((s) => s.trim()).filter(Boolean) };
      if (isNew) {
        await createProject(data);
        toast.success("Проект нэмэгдлээ!");
      } else if (editing) {
        await updateProject(editing.id, data);
        toast.success("Хадгалагдлаа!");
      }
      await load();
      closeForm();
    } catch { toast.error("Алдаа гарлаа"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Устгах уу?")) return;
    try {
      await deleteProject(id);
      toast.success("Устгагдлаа");
      await load();
    } catch { toast.error("Алдаа гарлаа"); }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800 }}>Проектүүд</h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>{projects.length} проект</p>
        </div>
        <button className="btn-primary" onClick={openNew}>+ Шинэ проект</button>
      </div>

      {/* Form modal */}
      {(isNew || editing) && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }}>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 20, padding: 32, width: "100%", maxWidth: 600,
            maxHeight: "90vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }}>
                {isNew ? "Шинэ проект" : "Засах"}
              </h2>
              <button onClick={closeForm} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {([
                ["Гарчиг *", "title", "text"],
                ["Товч тайлбар *", "description", "text"],
                ["Зургийн URL", "imageUrl", "text"],
                ["Live URL", "liveUrl", "text"],
                ["GitHub URL", "githubUrl", "text"],
                ["Категори", "category", "text"],
                ["Дараалал", "order", "number"],
              ] as [string, keyof typeof form, string][]).map(([lbl, key, type]) => (
                <div key={key}>
                  <label style={labelSt}>{lbl}</label>
                  <input className="input" type={type}
                    value={String(form[key] ?? "")}
                    onChange={(e) => setForm({ ...form, [key]: type === "number" ? +e.target.value : e.target.value })}
                  />
                </div>
              ))}

              <div>
                <label style={labelSt}>Дэлгэрэнгүй тайлбар</label>
                <textarea className="input" rows={4} style={{ resize: "vertical" }}
                  value={form.longDescription}
                  onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                />
              </div>

              <div>
                <label style={labelSt}>Технологиуд (таслалаар тусгаарла)</label>
                <input className="input" value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React, Next.js, Firebase..."
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="checkbox" id="featured" checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: "var(--accent)" }}
                />
                <label htmlFor="featured" style={{ fontSize: 14, cursor: "pointer" }}>
                  Онцлох (Featured)
                </label>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={closeForm}>Цуцлах</button>
              <button className="btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects list */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ height: 80, background: "var(--surface)", borderRadius: 12, animation: "pulse 1.5s ease infinite" }} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: "center", padding: 80, color: "var(--muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
          <p>Одоохондоо проект байхгүй байна.</p>
          <button className="btn-primary" onClick={openNew} style={{ marginTop: 20 }}>Эхний проект нэмэх</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {projects.map((p) => (
            <div key={p.id} className="card" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>🚀</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>{p.title}</span>
                  {p.featured && <span className="tag" style={{ fontSize: 10, padding: "2px 8px" }}>FEATURED</span>}
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.description}
                </p>
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {p.techStack.slice(0, 4).map(t => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={() => openEdit(p)} className="btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }}>Засах</button>
                <button onClick={() => handleDelete(p.id)}
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "8px 16px", borderRadius: 50, fontSize: 13, cursor: "pointer" }}>
                  Устгах
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const labelSt: React.CSSProperties = {
  display: "block", fontSize: 11,
  fontFamily: "var(--font-mono)", color: "var(--muted)",
  marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase",
};
