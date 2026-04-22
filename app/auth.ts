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
        // Simulate authentication with a dummy token
        // In a real app, you would validate against your backend

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Generate a dummy token
        const dummyToken = Buffer.from(
          `${credentials.email}:${Date.now()}`,
        ).toString("base64");

        return {
          id: credentials.email,
          name: credentials.email.split("@")[0],
          email: credentials.email,
          token: dummyToken,
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
