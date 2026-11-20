import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, seo } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = seo[isLocale(lang) ? lang : defaultLocale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#fff",
          background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.9 }}>FollowCheck</div>
        <div style={{ fontSize: 72, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>
          {t.title.split("|")[0]}
        </div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.9 }}>{t.description}</div>
      </div>
    ),
    size,
  );
}