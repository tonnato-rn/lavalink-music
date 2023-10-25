import { Events } from "discord.js";
import log from "../../utils/log";
import { client } from "../..";
import { readdirSync } from "fs";
import { resolve } from "path";
import { command_type } from "../../utils/types";
import Keyv from "keyv";

export const type = Events.ClientReady;
export default async function () {
    log("Ready!", "Discord");
    await client.lavalink.init({ ...client.user! });
    await client.application?.commands.set(readdirSync(resolve(__dirname, "../../commands/slash")).map(filename => {
        const command: command_type = require(`../../commands/slash/${filename}`).default;
        return command.data;
    }));
    log("コマンド準備完了", "Discord");
    const db = new Keyv("sqlite://db/music");
    await db.clear();
    log("Ready!", "Database");
}