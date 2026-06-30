import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
