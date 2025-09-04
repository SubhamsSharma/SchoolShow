
import { z } from "zod";
const MAX_FILE_SIZE = 0.8 * 1024 * 1024; // .5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
export const schoolSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  contact: z.string().min(7).max(15).regex(/^[0-9+\-\s()]+$/),
  email_id: z.email(),
  // image handled separately (File)
  image:z.file()
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `The file is too large. Please choose a file smaller than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Please upload a valid image file (JPEG, PNG, or WebP).",
  })
});


