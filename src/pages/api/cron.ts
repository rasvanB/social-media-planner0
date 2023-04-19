import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const posts = await prisma.post.findMany({
    where: { scheduledAt: { lte: new Date().getTime() }, published: false },
    include: {
      platforms: true,
    },
  });
  // TODO: Send posts to platforms
  posts.forEach((post) => {
    const platforms = post.platforms.map((platform) => platform.name);

    const user = prisma.user.findUnique({
      where: { id: post.authorId },
      include: { accounts: true },
    });

    if (platforms.includes("twitter")) {
      // post to twitter
    }
    if (platforms.includes("facebook")) {
      // post to facebook
    }
    if (platforms.includes("instagram")) {
      // post to instagram
    }
  });

  return res.status(200).json({ message: "OK" });
};

export default handler;
