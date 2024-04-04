import { hash } from "bcrypt";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const usersRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Must be at least 8 characters long"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const password = await hash(input.password, 10);

      await ctx.db.insert(users).values({
        name: input.name,
        email: input.email,
        password,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
  }),
});
