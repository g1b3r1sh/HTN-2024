import { query } from "./_generated/server";

export const getIdeas = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("ideas").collect();
	}
});
