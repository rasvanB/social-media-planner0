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

declare module "next-auth" {
  interface Session extends DefaultSession {
    id: string;
    email: string;
    user: {
      id: string;
      username: string;
      email: string;
    } & DefaultSession["user"];
  }
}
export const authOptions: NextAuthOptions = {
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
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id as string;
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
