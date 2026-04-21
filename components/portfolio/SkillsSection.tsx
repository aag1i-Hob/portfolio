"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/types";

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Group by category
  const groups = skills.reduce((acc, skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (skills.length === 0) return null;

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "100px 24px",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 64 }}>
          <p className="section-label">// Техник мэдлэг</p>
          <h2 className="section-title">
            Миний{" "}
            <span className="gradient-text">Ур чадварууд</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 40,
          }}
        >
          {Object.entries(groups).map(([category, catSkills]) => (
            <div key={category}>
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                {category}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {catSkills.map((skill, i) => (
                  <SkillItem
                    key={skill.id}
                    skill={skill}
                    visible={visible}
                    delay={i * 80}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillItem({
  skill,
  visible,
  delay,
}: {
  skill: Skill;
  visible: boolean;
  delay: number;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500 }}>{skill.name}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-fill"
          style={{
            width: visible ? `${skill.level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
