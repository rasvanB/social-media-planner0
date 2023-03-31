import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

export const transporter = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: "razvanbosneagu1@gmail.com",
    pass: env.SENDINBLUE_PASSWORD,
  },
});
