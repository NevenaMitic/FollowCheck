import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils";
import { locales, isLocale, seo, SITE_URL, SITE_NAME } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = seo[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.title, template: `%s | ${SITE_NAME}` },
    description: t.description,
    keywords: t.keywords,
    applicationName: SITE_NAME,
    authors: [{ name: "Nevena Mitić", url: "https://nevena-portfolio.vercel.app" }],
    alternates: {
      canonical: `/${lang}`,
      languages: { sr: "/sr", en: "/en", "x-default": "/sr" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: SITE_NAME,
      title: t.title,
      description: t.description,
      locale: t.ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => seo[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { email: false, address: false, telephone: false },
  
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = seo[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, inLanguage: lang },
      {
        "@type": "WebApplication",
        name: SITE_NAME,
        url: `${SITE_URL}/${lang}`,
        description: t.description,
        applicationCategory: "SocialNetworkingApplication",
        operatingSystem: "Any",
        inLanguage: lang,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <html lang={lang} suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className="antialiased font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider>
          <I18nProvider initialLocale={lang}>

            {children}
          </I18nProvider>
        </ThemeProvider>
         <Analytics />
      </body>
    </html>
  );
}