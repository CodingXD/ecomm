import { z } from "zod";
import { schema } from "./schema";

export type FormFields = z.infer<typeof schema>;

export type VerifyEmailFormProps = {
  email: string;
};
