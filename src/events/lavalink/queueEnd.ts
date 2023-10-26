import { Player } from "lavalink-client";
import { client } from "../..";
import Keyv from "keyv";
import { GuildTextBasedChannel } from "discord.js";
import { error } from "../../utils/embed";

export default async (player: Player) => {
    const db = new Keyv("sqlite://db/music");
    const channel = client.channels.cache.get(player.textChannelId!) as GuildTextBasedChannel;
    if (!channel) return player.destroy();
    await channel.messages.cache.get(await db.get(player.guildId))?.delete();
    await db.delete(player.guildId);
    const msg = await channel.send({ embeds: [error("再生終了", "キューは現在空です")] });
    db.set(player.guildId, msg.id);
}