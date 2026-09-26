export interface ContactForm {
    interests: string[]
    budget: string
    name: string
    email: string
    message: string
}


export interface WhatWeDo {
    number: string;
    title: string;
    points: string[];
}

export interface Service {
    title: string;
    description: string;
    image: string;
}

export interface Project {
    title: string;
    description: string;
    image: string;
}

export interface Steps {
    title: string;
    description: string;
    image?: string;
}

export interface Faq {
    question: string;
    answer: string;
}

export interface Menu {
    name: string;
    link: string;
}

// Define project categories in a single object
export const PROJECT_CATEGORIES = {
    ALL: "all",
    LANDING: "landing",
    ECOMMERCE: "ecommerce",
    CRM: "crm",
    UI_UX: "uiux",
    AI_INTEGRATION: "ai",
  } as const;

// Define project types
export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;

export interface ProjectGallery {
  id: number
  title: string
  companyName: string
  description: string
  categories: ProjectCategory[]
  imageUrl: string
  url?: string
  releaseDate?: string
  slug?: string
  about?: string[]
  solution?: string[]
  features?: string[]
  imageGallery?: string[]
  size: "small" | "medium" | "large" | "extralarge"
}

export interface HeroStat {
  value: string
  label: string
}
