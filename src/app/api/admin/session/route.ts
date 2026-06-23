import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

export async function GET() {
  const { isAdminAuthenticated } = await import("@/lib/admin-auth");
  return NextResponse.json({ authenticated: await isAdminAuthenticated() });
}
