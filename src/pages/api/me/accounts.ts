import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const data = await getServerAuthSession({ req, res });
      if (!data) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await prisma.user.findUnique({
        where: { id: data.user.id },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const accounts = await prisma.account.findMany({
        where: { userId: data.user.id },
      });
      return res.status(200).json(accounts);
    } catch (error) {
      return res.status(500).json({ message: "Error" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
