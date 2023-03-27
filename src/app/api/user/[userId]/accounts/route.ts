import { prisma } from "~/server/db";

export async function GET(
  _req: unknown,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const accounts = await prisma.account.findMany({
      where: { userId: params.userId },
    });
    return new Response(JSON.stringify(accounts), { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
