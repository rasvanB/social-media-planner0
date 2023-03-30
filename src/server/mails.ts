import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

export const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: env.SENDGRID_API_KEY,
  },
});
