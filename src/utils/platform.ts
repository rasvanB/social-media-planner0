export const platforms = ["facebook", "instagram", "twitter"] as const;

export type Platform = (typeof platforms)[number];

export const platformIcons: Record<Platform, string> = {
  facebook: "logos:facebook",
  instagram: "skill-icons:instagram",
  twitter: "logos:twitter",
};

export const icon = (platform: string) => {
  if (platform.includes(platform)) return platformIcons[platform as Platform];
  return "logos:unknown";
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
