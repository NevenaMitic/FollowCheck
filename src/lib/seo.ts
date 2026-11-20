export const locales = ["sr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sr";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://instafollowcheck.vercel.app").replace(/\/$/, "");
export const SITE_NAME = "FollowCheck";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const seo = {
  en: {
    title: "Instagram Unfollowers Tracker – Free & Private | FollowCheck",
    description:
      "See who unfollowed you on Instagram and who doesn't follow you back. Free, private and fast – no password or login required.",
    keywords: [
      "instagram unfollowers",
      "who unfollowed me on instagram",
      "instagram follower checker",
      "who doesn't follow me back",
      "instagram unfollowers tracker",
    ],
    ogLocale: "en_US",
    faq: [
      { q: "Is FollowCheck free?", a: "Yes, FollowCheck is completely free to use." },
      { q: "Do I need to enter my Instagram password?", a: "No. FollowCheck never asks for your password." },
    ],
  },
  sr: {
    title: "Ko me je otpratio na Instagramu? | FollowCheck",
    description:
      "Saznaj ko te je otpratio na Instagramu i ko te ne prati nazad. Besplatno, privatno i brzo – bez lozinke i prijave.",
    keywords: [
      "ko me je otpratio na instagramu",
      "instagram unfollowers",
      "ko me ne prati nazad",
      "instagram pratioci",
      "provera pratilaca instagram",
    ],
    ogLocale: "sr_RS",
    faq: [
      { q: "Da li je FollowCheck besplatan?", a: "Da, FollowCheck je potpuno besplatan." },
      { q: "Da li treba da unesem lozinku za Instagram?", a: "Ne. FollowCheck nikada ne traži tvoju lozinku." },
    ],
  },
} satisfies Record<Locale, unknown>;