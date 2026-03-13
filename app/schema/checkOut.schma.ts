import * as z from "zod";

export const checkOutSchema = z
  .object({
     details: z.string().nonempty("Details are required"),
     phone: z.string().nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
     city: z.string().nonempty("City is required"),
      })

export type CheckOutSchemaType = z.infer<typeof checkOutSchema>;
