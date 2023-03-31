import { type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "~/server/db";
import { transporter } from "~/server/mails";

const dataSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl.href);
    const result = dataSchema.safeParse(await req.json());
    if (!result.success) return new Response("Invalid data", { status: 400 });

    const { email } = result.data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return new Response("User not found", { status: 404 });

    const resetToken = await prisma.resetToken.create({
      data: {
        expires: (Date.now() + 1000 * 60 * 60).toString(),
        user: { connect: { id: user.id } },
      },
    });

    await transporter.sendMail({
      from: "razvanbosneagu1@gmail.com",
      to: email,
      subject: "Reset your password",
      html: `
        <h1>Reset your password</h1>
        <p>Click on the link below to reset your password</p>
        <a href="${url.origin}/auth/reset-password/${resetToken.token}">Reset password</a>
        `,
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
