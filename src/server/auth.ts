import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "~/types/authTypes";
import { hashPassword } from "~/utils/hash";

declare module "next-auth" {
  interface Session extends DefaultSession {
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
        console.log("result", result.data);
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
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
