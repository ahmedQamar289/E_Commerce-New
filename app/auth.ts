import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type LoginResponse = {
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const apiBaseUrl =
          process.env.API_URL ??
          process.env.NEXT_PUBLIC_API_URL ??
          "https://ecommerce.routemisr.com/api/v1";

        const response = await fetch(`${apiBaseUrl}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payload = (await response.json()) as LoginResponse;

        if (!response.ok || !payload.token || !payload.user) {
          throw new Error(payload.message || "Login failed");
        }

        return {
          id: String(payload.user.id),
          name: payload.user.name ?? payload.user.email.split("@")[0],
          email: payload.user.email,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: (user as { id?: string }).id,
          name: user.name,
          email: user.email,
        };
        token.token = (user as { token?: string }).token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...(session.user ?? {}),
        ...(token.user ?? {}),
      };
      session.token = token.token;
      return session;
    },
  },

};
