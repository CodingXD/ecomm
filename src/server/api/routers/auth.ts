import { compareSync, hashSync } from "bcrypt";
import { eq } from "drizzle-orm";
import { schema as LoginSchema } from "~/app/login/_components/Form/schema";
import { schema as SignupSchema } from "~/app/signup/_components/Form/schema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(LoginSchema).mutation(async ({ ctx, input }) => {
    const foundUsers = await ctx.db
      .select({ id: users.id, name: users.name, password: users.password })
      .from(users)
      .where(eq(users.email, input.email))
      .limit(1);

    if (foundUsers.length === 0) {
      return {
        success: false,
        errorMessage: "User not found",
      };
    }

    if (!compareSync(input.password, foundUsers[0]!.password)) {
      return {
        success: false,
        errorMessage: "Email/Password is incorrect",
      };
    }

    return {
      success: true,
      data: {
        id: foundUsers[0]!.id,
        name: foundUsers[0]!.name,
        email: input.email,
      },
    };
  }),

  signup: publicProcedure
    .input(SignupSchema)
    .mutation(async ({ ctx, input }) => {
      const foundUsers = await ctx.db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (foundUsers.length > 0) {
        return {
          success: false,
          errorMessage: "Account already exists",
        };
      }

      const password = hashSync(input.password, 10);
      const newUser = await ctx.db
        .insert(users)
        .values({
          email: input.email,
          name: input.name,
          password,
        })
        .returning({ id: users.id, name: users.name });

      return {
        success: true,
        data: {
          id: newUser[0]!.id,
          name: newUser[0]!.name,
          email: input.email,
        },
      };
    }),
});
