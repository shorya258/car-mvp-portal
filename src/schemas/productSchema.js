import { z } from "zod";

const productDescriptionValidation = z
  .string()
  .min(5, "Must be at least 2 characters")
  .max(100, "Must be not more than 100 character");
export const ProductSchema = z.object({
  productName: z
    .string()
    .min(2, "Username must be at least two characters")
    .max(20, "Must be no more than 20 characters"),
  productDescription: productDescriptionValidation,
  tags: z
  .array(z.string())
  .max(5, "You can add a maximum of 5 tags"),
  images: z
    .array(z.string().url())
    .min(1, "Upload at least 1 picture.")
    .max(10, "You can upload a maximum of 10 pictures"),
});
