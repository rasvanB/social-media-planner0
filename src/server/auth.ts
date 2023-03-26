import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "~/types/auth-types";
import { hashPassword } from "~/utils/hash";
import { env } from "~/env.mjs";

declare module "next-auth" {
  interface Session extends DefaultSession {
    id: string;
    user: User & DefaultSession["user"];
  }
  interface User {
    id: string;
    username: string;
    email: string;
    image: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    image: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {},
      async authorize(credentials) {
        const result = signInSchema.safeParse(credentials);
        if (!result.success) {
          throw new Error("Invalid credentials");
        }
        const { email, password } = result.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error("User not found");
        }
        const isPasswordValid = user.password == hashPassword(password);
        if (!isPasswordValid) {
          throw new Error("Password is incorrect");
        }
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    error: "/",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.username;
        token.image = user.image;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user = {
          id: token.id,
          email: token.email,
          username: token.name,
          image: token.image,
        };
      }
      return session;
    },
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  session: {
    strategy: "jwt",
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
