import { type NextRequest } from "next/server";
import { prisma } from "~/server/db";
import { signUpSchema } from "~/types/authTypes";
import { hashPassword } from "~/utils/hash";

export async function POST(req: NextRequest) {
  try {
    const result = signUpSchema.safeParse(await req.json());
    if (!result.success) {
      console.log(result.error);
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
