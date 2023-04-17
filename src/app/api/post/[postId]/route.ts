/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type NextRequest } from "next/server";
import { prisma } from "~/server/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    console.log(postId);
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    if (!post) return new Response("Post not found", { status: 404 });

    const json = JSON.stringify(post, (_key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });

    return new Response(json, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
