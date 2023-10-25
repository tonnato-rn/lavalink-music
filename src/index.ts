import { Client } from "discord.js";
import { LavalinkManager } from "lavalink-client";
import conf from "./conf";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { error } from "./utils/log";
import setuplavalink from "./utils/setuplavalink";
process.on("uncaughtException", error);
if (!existsSync(`${process.cwd()}/db`)) mkdirSync(`${process.cwd()}/db`)
export const client = new Client(require("discordjs-allintents-v14")) as Client & { lavalink: LavalinkManager };
client.lavalink = new LavalinkManager({ nodes: [{ host: conf.lavalink.host, port: parseInt(conf.lavalink.port), authorization: conf.lavalink.password }], autoSkip: true, playerOptions: { clientBasedPositionUpdateInterval: 150, defaultSearchPlatform: "ytsearch", volumeDecrementer: 0.75, onDisconnect: { destroyPlayer: true } }, queueOptions: { maxPreviousTracks: 25 }, sendToShard: (guildId, payload) => client.guilds.cache.get(guildId)?.shard?.send(payload) });
client.on("raw", (r) => client.lavalink.sendRawData(r));
setuplavalink(client.lavalink);
readdirSync(`${__dirname}/events/client`).forEach(filename => {
    const event = require(`./events/client/${filename}`);
    client.on(event.type, event.default);
});
client.login(conf.token);