import { z } from "zod";

export const schema = z.object({
  otp: z.string({ required_error: "OTP is required" }).max(8),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address")
    .toLowerCase(),
});
