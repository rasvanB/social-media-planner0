import { type NextRequest } from "next/server";
import { prisma } from "~/server/db";
import { signInSchema, signUpSchema } from "~/types/authTypes";
import { hashPassword } from "~/utils/hash";

export async function GET(req: NextRequest) {
  try {
    const body = (await req.json()) as unknown;
    const result = signInSchema.safeParse(body);
    if (!result.success) {
      return new Response("Invalid credentials", { status: 400 });
    }
    const { email, password } = result.data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const isPasswordValid = user.password === hashPassword(password);
    if (!isPasswordValid) {
      return new Response("Invalid password", { status: 401 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as unknown;
    const result = signUpSchema.safeParse(body);
    if (!result.success) {
      return new Response("Invalid credentials", { status: 400 });
    }
    const { email, password, username } = result.data;
    const hashedPassword = hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: username,
      },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
