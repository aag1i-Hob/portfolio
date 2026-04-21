"use client";

import Image from "next/image";
import type { Project } from "@/types";

export default function ProjectsSection({
  projects,
}: {
  projects: Project[];
}) {
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      style={{
        padding: "100px 24px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <p className="section-label">// Миний ажлууд</p>
        <h2 className="section-title">
          Сонгосон{" "}
          <span className="gradient-text">Проектүүд</span>
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 24,
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* View all link */}
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <a href="/projects" className="btn-ghost">
          Бүх проект харах
        </a>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div
      className="card"
      style={{
        overflow: "hidden",
        animation: `slideUp 0.6s ease ${index * 0.1}s both`,
        cursor: "pointer",
      }}
      onClick={() => project.liveUrl && window.open(project.liveUrl, "_blank")}
    >
      {/* Image */}
      <div
        style={{
          height: 200,
          background: "var(--surface-2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, rgba(108,99,255,0.1), rgba(255,101,132,0.1))",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 48,
                fontWeight: 800,
                color: "rgba(108,99,255,0.3)",
              }}
            >
              {project.title[0]}
            </span>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "var(--accent)",
              color: "white",
              padding: "4px 12px",
              borderRadius: 50,
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              letterSpacing: "0.1em",
            }}
          >
            FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--muted)",
              background: "var(--surface-2)",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            {project.category}
          </span>
        </div>

        <p
          style={{
            color: "var(--muted)",
            fontSize: 14,
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 12 }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
