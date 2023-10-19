import { Client } from "discord.js";
import { LavalinkManager } from "lavalink-client";
import conf from "./conf";

export const client = new Client(require("discordjs-allintents-v14")) as Client & { lavalink: LavalinkManager };
client.lavalink = new LavalinkManager({ nodes: [{ host: conf.lavalink.host, port: parseInt(conf.lavalink.port), authorization: conf.lavalink.password }], autoSkip: true, playerOptions: { clientBasedPositionUpdateInterval: 150, defaultSearchPlatform: "ytsearch", volumeDecrementer: 0.75, onDisconnect: { destroyPlayer: true } }, queueOptions: { maxPreviousTracks: 25 }, sendToShard: (guildId, payload) => client.guilds.cache.get(guildId)?.shard?.send(payload) });

client.login(conf.token);