export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
  icon?: string;
  order: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  location: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  resumeUrl?: string;
}

export interface SiteStats {
  totalProjects: number;
  totalMessages: number;
  unreadMessages: number;
  totalSkills: number;
}
