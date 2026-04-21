"use client";

import { useEffect, useRef } from "react";
import type { Profile } from "@/types";

export default function HeroSection({ profile }: { profile: Profile | null }) {
  const name = profile?.name ?? "Таны Нэр";
  const title = profile?.title ?? "Full-Stack Developer";
  const bio =
    profile?.bio ??
    "Би веб болон мобайл аппликейшн хөгжүүлдэг, хэрэглэгчдэд хамгийн сайн туршлагыг өгөхийг зорьдог хөгжүүлэгч.";

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "100px 24px 60px",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "0%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,101,132,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <div style={{ width: "100%", maxWidth: 700 }}>
        {/* Available badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.2)",
            padding: "6px 16px",
            borderRadius: 50,
            marginBottom: 32,
            animation: "fadeIn 0.6s ease forwards",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 8px rgba(34,197,94,0.5)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "#22c55e",
              letterSpacing: "0.1em",
            }}
          >
            Ажил хайж байна
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 24,
            animation: "slideUp 0.7s ease 0.1s both",
          }}
        >
          Сайн уу, би{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {name}
          </span>
        </h1>

        {/* Title */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 18,
            color: "var(--muted)",
            marginBottom: 20,
            animation: "slideUp 0.7s ease 0.2s both",
          }}
        >
          {"<"} {title} {"/>"}
        </p>

        {/* Bio */}
        <p
          style={{
            fontSize: 17,
            color: "var(--muted)",
            lineHeight: 1.8,
            maxWidth: 560,
            marginBottom: 40,
            animation: "slideUp 0.7s ease 0.3s both",
          }}
        >
          {bio}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            animation: "slideUp 0.7s ease 0.4s both",
          }}
        >
          <a href="#projects" className="btn-primary">
            Проектүүдийг үзэх →
          </a>
          <a href="#contact" className="btn-ghost">
            Холбоо барих
          </a>
        </div>

        {/* Social links */}
        {(profile?.github || profile?.linkedin || profile?.twitter) && (
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 48,
              animation: "slideUp 0.7s ease 0.5s both",
            }}
          >
            {profile.github && (
              <SocialLink href={profile.github} label="GitHub" />
            )}
            {profile.linkedin && (
              <SocialLink href={profile.linkedin} label="LinkedIn" />
            )}
            {profile.twitter && (
              <SocialLink href={profile.twitter} label="Twitter" />
            )}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          animation: "fadeIn 1s ease 1s both",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.15em",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: "var(--muted)",
        textDecoration: "none",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        padding: "8px 16px",
        borderRadius: 8,
        border: "1px solid var(--border)",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--accent)";
        e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--muted)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {label} ↗
    </a>
  );
}
