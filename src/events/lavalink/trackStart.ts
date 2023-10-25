import { Player, Track } from "lavalink-client";
import { client } from "../..";
import Keyv from "keyv";
import { EmbedBuilder, GuildTextBasedChannel } from "discord.js";

export default async (player: Player, track: Track) => {
    const db = new Keyv("sqlite://db/music");
    const channel = client.channels.cache.get(player.textChannelId!) as GuildTextBasedChannel;
    if (!channel) return player.destroy();
    await channel.messages.cache.get(await db.get(player.guildId))?.delete();
    await db.delete(player.guildId);
    const msg = await channel.send({
        embeds: [
            new EmbedBuilder()
                .setColor("Green")
                .setTitle("再生開始")
                .setThumbnail(track.info.artworkUrl)
                .setDescription(`**${track.info.author}**の[**${track.info.title}**](${track.info.uri})を**${track.info.sourceName}**から再生します`)
                .setTimestamp()
        ]
    });
    db.set(player.guildId, msg.id);
}