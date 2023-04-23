/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type NextRequest } from "next/server";
import { prisma } from "~/server/db";
import { serverPostSchema } from "~/types/post";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const result = serverPostSchema.safeParse(await req.json());
    if (!result.success) return new Response("Invalid data", { status: 400 });
    const { userId } = params;
    const postData = result.data;
    const post = await prisma.post.create({
      data: {
        content: postData.message,
        media: postData.file,
        authorId: userId,
        createdAt: Date.now(),
        scheduledAt: postData.scheduledAt,
        platforms: {
          connect: postData.platforms.map((platform) => ({
            name: platform,
          })),
        },
      },
    });
    const json = JSON.stringify(post, (_key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );

    return new Response(json, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
