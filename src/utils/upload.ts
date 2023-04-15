import { Upload } from "upload-js";
import { env } from "~/env.mjs";

export const upload = Upload({ apiKey: env.NEXT_PUBLIC_UPLOADIO_KEY });
