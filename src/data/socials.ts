// Single source of truth for the social profiles shown in the menu, footer and contact page.
export const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/guillermo-penaranda-hernandez/",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/nexus_labs1/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@guillermo_penaranda.dev",
  },
] as const;

export type SocialId = (typeof SOCIAL_LINKS)[number]["id"];
