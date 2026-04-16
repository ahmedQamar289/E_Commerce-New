"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export default async function getUserEmail() {
  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken || !process.env.NEXTAUTH_SECRET) {
    console.error("Missing session token or NEXTAUTH_SECRET for email lookup.");
    return null;
  }

  const decoded = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const email = (decoded as { user?: { email?: string } } | null)?.user?.email;
  return email ?? null;
}
