import { LavalinkManager } from "lavalink-client";
import { client } from "..";
import log, { error } from "./log";

export default (lavalink: LavalinkManager) => {
    lavalink
        .on("trackStart", require("../events/lavalink/trackStart").default)
        .on("queueEnd", require("../events/lavalink/queueEnd").default);
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