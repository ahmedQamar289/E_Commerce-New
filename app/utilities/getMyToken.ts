"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export default async function getMyToken() {
  try {
    const cookieStore = await cookies();
    const sessionToken =
      cookieStore.get("__Secure-next-auth.session-token")?.value ??
      cookieStore.get("next-auth.session-token")?.value;

    if (!sessionToken || !process.env.NEXTAUTH_SECRET) {
      console.log("❌ No session token or NEXTAUTH_SECRET");
      return null;
    }

    const decoded = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const myToken = decoded?.token as string | undefined;
    if (!myToken) {
      console.log("❌ Token not found in decoded session");
      return null;
    }
    console.log("✅ Token retrieved successfully");
    return myToken;
  } catch (err) {
    console.log("❌ Error in getMyToken:", err);
    return null;
  }
}
