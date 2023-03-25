import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { type NextRequest } from "next/server";
import { prisma } from "~/server/db";
import { signUpSchema } from "~/types/authTypes";
import { hashPassword } from "~/utils/hash";

export async function POST(req: NextRequest) {
  try {
    const result = signUpSchema.safeParse(await req.json());
    if (!result.success) {
      return new Response("Invalid credentials", { status: 400 });
    }
    const { email, password, username } = result.data;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return new Response("User already exists", { status: 400 });
    }

    const hashedPassword = hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Error", { status: 500 });
  }
}
