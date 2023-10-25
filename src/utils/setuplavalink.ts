import { LavalinkManager } from "lavalink-client";
import { client } from "..";
import { readdirSync } from "fs";
import log, { error } from "./log";
import { resolve } from "path";

export default (lavalink: LavalinkManager) => {
    lavalink
        .on("trackStart", require("../events/lavalink/trackStart").default)
        ;
    lavalink.nodeManager
        .on("error", (node, err) => {
            if (!node.connected) error("接続に失敗しました\n設定を確認するか、起動しているか確認してください", "Lavalink", true);
            else error(err, "Lavalink");
        })
        .on("connect", (node) => {
            log(`${node.options.host}:${node.options.port}へ接続完了`, "Lavalink");
            client.lavalink.createPlayer({ guildId: "global", voiceChannelId: "global" });
        })
        .on("disconnect", (node) => error(`${node.options.host}:${node.options.port}から切断されました`, "Lavalink", true));
}