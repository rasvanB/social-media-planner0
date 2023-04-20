import axios from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { TwitterClient } from "~/server/platforms";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const posts = await prisma.post.findMany({
    where: { scheduledAt: { lte: new Date().getTime() }, published: false },
    include: {
      platforms: true,
    },
  });
  // TODO: Send posts to platforms

  for (const post of posts) {
    const platforms = post.platforms.map((platform) => platform.name);

    const user = await prisma.user.findUnique({
      where: { id: post.authorId },
      include: { accounts: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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

        const imageBuffer = Buffer.from(response.data, "base64");

        twitterClient.postImagePost(post.content, imageBuffer);
      }
    }
    if (platforms.includes("facebook")) {
      // post to facebook
    }
    if (platforms.includes("instagram")) {
      // post to instagram
    }
  }

  return res.status(200).json({ message: "OK" });
};

export default handler;
