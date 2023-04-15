import { type NextRequest } from "next/server";
import { prisma } from "~/server/db";
import { serverPostSchema } from "~/types/post";

// TODO: MAKE SURE TO UPLOAD THE FILE TO STATIC URL AND RETURN THE URL OF THE FILE AFTER CREATING POST

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
        scheduledAt: postData.scheduledAt,
        media: postData.file,
        authorId: userId,
      },
    });
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
