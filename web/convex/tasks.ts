import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getPoints = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("points").collect();
	}
});

export const addPoint = mutation({
	args: {
		latitude: v.number(),
		longitude: v.number(),
		floorId: v.string()
	},
	handler: async (ctx, args) => {
		return ctx.db.insert("points", args);
	}
});

export const removePoint = mutation({
	args: {
		id: v.id("points")
	},
	handler: async (ctx, args) => {
		ctx.db.delete(args.id);
	}
});
