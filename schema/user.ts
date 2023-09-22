import z from "zod";

export const userSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
});

export type userSchemaType = z.infer<typeof userSchema>;
