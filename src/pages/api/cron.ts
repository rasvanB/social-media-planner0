import axios from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { TwitterClient } from "~/server/platforms";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await prisma.post.findMany({
      where: { scheduledAt: { lte: new Date().getTime() }, published: false },
      include: {
        platforms: true,
      },
    });
    // TODO: Send posts to platforms

    console.log(posts);

    for (const post of posts) {
      const platforms = post.platforms.map((platform) => platform.name);

      const user = await prisma.user.findUnique({
        where: { id: post.authorId },
        include: { accounts: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let hasPublished = false;
      if (platforms.includes("twitter")) {
        const twitterAccount = user.accounts.find(
          (account) => account.provider === "twitter"
        );
        if (!twitterAccount) {
          return res.status(404).json({ message: "Account not found" });
        }
        if (twitterAccount.oauth_token && twitterAccount.oauth_token_secret) {
          const twitterClient = new TwitterClient({
            access_token: twitterAccount.oauth_token,
            access_token_secret: twitterAccount.oauth_token_secret,
          });

          const response = await axios.get<string>(post.media, {
            responseType: "arraybuffer",
          });

          const buffer = Buffer.from(response.data, "binary");

          await twitterClient.createImagePost(post.content, buffer);

          hasPublished = true;
        }
      }
      if (platforms.includes("facebook")) {
        // post to facebook
        // TODO: Add facebook client
      }
      if (platforms.includes("instagram")) {
        // post to instagram
        // TODO: Add instagram client
      }
      if (hasPublished) {
        await prisma.post.update({
          where: { id: post.id },
          data: { published: true },
        });
      }
    }

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
