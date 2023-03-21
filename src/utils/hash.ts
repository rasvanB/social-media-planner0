import crypto from "crypto";
import { env } from "~/env.mjs";
const { SECRET } = env;

export const hashPassword = (password: string) =>
  crypto.createHmac("sha256", SECRET).update(password).digest("hex");
