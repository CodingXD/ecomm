import { count } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { categories } from "~/server/db/schema";

export const categoriesRouter = createTRPCRouter({
  getCategories: publicProcedure
    .input(z.object({ limit: z.number(), offset: z.number() }))
    .query(async ({ ctx, input }) => {
      const response = await ctx.db
        .select()
        .from(categories)
        .limit(input.limit)
        .offset(input.offset);
      return response;
    }),

  getTotalCategoriesCount: publicProcedure.query(async ({ ctx, input }) => {
    const response = await ctx.db.select({ count: count() }).from(categories);
    return response[0]?.count ?? 0;
  }),
});
