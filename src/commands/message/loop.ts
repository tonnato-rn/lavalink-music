import commandName from "../../utils/commandName"
import { msg_command_type } from "../../utils/types"
import { client } from "../..";

export default {
    alias: [commandName(__filename), "l"],
    async execute(message, args) {
        if (!message.guildId || !message.guild) return;
        const voiceChannelId = message.member?.voice.channelId;
        if (!voiceChannelId) return message.reply("ボイスチャンネルに参加してください");
        const player = client.lavalink.getPlayer(message.guildId) || await client.lavalink.createPlayer({
            guildId: message.guildId,
            voiceChannelId: voiceChannelId,
            textChannelId: message.channelId
        });
        if (!player) return message.reply("Botがボイスチャンネルにいません");
        if (player.voiceChannelId !== voiceChannelId) return message.reply("別のチャンネルへ接続中です");
        const loopmode = args[0];
        if (loopmode === "off" || loopmode === "track" || loopmode === "queue") await player.setRepeatMode(loopmode);
        else {
            switch (player.repeatMode) {
                case "off":
                    await player.setRepeatMode("track");
                    break;
                case "track":
                    await player.setRepeatMode("queue");
                    break;
                case "queue":
                    await player.setRepeatMode("off");
                    break;
            }
        }
        let repeatMode = null;
        switch (player.repeatMode) { case "off": repeatMode = "ループを無効にしました"; break; case "track": repeatMode = "1つの曲をループします"; break; case "queue": repeatMode = "追加されている曲をループします"; break; }
        message.reply(repeatMode);
    }
} as msg_command_type