import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/lib/seo";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  const first = (req.headers.get("accept-language") ?? "").split(",")[0].toLowerCase();
  const locale = /^(sr|hr|bs|sh)/.test(first) ? "sr" : "en";

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };