import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { categories, userInterestedCategories } from "~/server/db/schema";

export const categoriesRouter = createTRPCRouter({
  getCategories: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        offset: z.number(),
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const response = await ctx.db
        .select()
        .from(categories)
        .leftJoin(
          userInterestedCategories,
          and(
            eq(categories.id, userInterestedCategories.categoryId),
            eq(userInterestedCategories.userId, input.userId),
          ),
        )
        .limit(input.limit)
        .offset(input.offset);
      return response;
    }),

  getTotalCategoriesCount: publicProcedure.query(async ({ ctx, input }) => {
    const response = await ctx.db
      .select({ count: sql<number>`COUNT(*)::INTEGER` })
      .from(categories);
    return response[0]?.count ?? 0;
  }),

  saveInterest: publicProcedure
    .input(
      z.object({ categoryId: z.string().uuid(), userId: z.string().uuid() }),
    )
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .delete(userInterestedCategories)
        .where(
          and(
            eq(userInterestedCategories.categoryId, input.categoryId),
            eq(userInterestedCategories.userId, input.userId),
          ),
        )
        .returning({ id: userInterestedCategories.id });

      if (response.length === 0) {
        await ctx.db.insert(userInterestedCategories).values({
          categoryId: input.categoryId,
          userId: input.userId,
        });
      }

      return null;
    }),
});
