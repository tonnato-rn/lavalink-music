import { EmbedBuilder } from "discord.js";

export const error = (title?: string, description?: string, timestamp?: boolean) => new EmbedBuilder().setTitle(title || null).setDescription(description || null).setColor("Red").setTimestamp(timestamp ? new Date() : null);