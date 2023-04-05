import { z } from "zod";
import { isFileImage, isFileVideo } from "~/utils/post";

const customFileSchema = z.custom<File>(
  (value) => {
    if (typeof File !== "undefined" && value instanceof File) {
      return true;
    }
    return false;
  },
  { message: "Please select a file" }
);

const dateRegex =
  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/;

export const postSchema = z
  .object({
    platforms: z
      .array(z.string())
      .min(1, { message: "Please select at least one platform" }),
    message: z
      .string()
      .min(1, {
        message: "Please enter a message",
      })
      .max(280, { message: "Message must be less than 280 characters" }),
    file: customFileSchema,
    scheduledAt: z
      .string({ required_error: "Please enter a date and time" })
      .regex(dateRegex, {
        message: "Please enter a valid date and time",
      }),
  })
  .refine((data) => isFileImage(data.file) || isFileVideo(data.file), {
    message: "File must be an image or video",
    path: ["file"],
  })
  .refine((data) => data.file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
    path: ["file"],
  });

export type ValidPostState = z.infer<typeof postSchema>;

export type Option = {
  value: string;
  label: string;
};

export type PostState = Omit<ValidPostState, "file"> & {
  file: File | null;
};
