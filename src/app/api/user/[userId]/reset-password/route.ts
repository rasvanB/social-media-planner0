import { type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "~/server/db";
import { hashPassword } from "~/utils/hash";

const dataSchema = z.object({
  password: z.string().min(8),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const result = dataSchema.safeParse(await req.json());
    if (!result.success) return new Response("Invalid data", { status: 400 });
    const { password } = result.data;
    const { userId } = params;

    const hashedPassword = hashPassword(password);

    const user = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    if (!user) return new Response("User not found", { status: 404 });

    await prisma.resetToken.deleteMany({
      where: { id: userId },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
