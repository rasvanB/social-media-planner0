import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const posts = await prisma.post.findMany({
    where: { scheduledAt: { lte: new Date().getTime() } },
    include: {
      platforms: true,
    },
  });
  // TODO: Send posts to platforms
  posts.forEach((post) => {
    console.log(post);
  });

  return res.status(200).json({ message: "OK" });
};

export default handler;
