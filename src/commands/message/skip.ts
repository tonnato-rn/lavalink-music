import commandName from "../../utils/commandName"
import { msg_command_type } from "../../utils/types"
import { client } from "../..";
import { error } from "../../utils/embed";

export default {
    alias: [commandName(__filename), "s"],
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
        if (player.queue.tracks.length <= 1) return message.reply({ embeds: [error(undefined, "次の曲がないのでスキップできません")] });

        await player.skip();

        message.reply("スキップしました");
    }
} as msg_command_type