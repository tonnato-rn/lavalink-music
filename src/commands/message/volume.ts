import commandName from "../../utils/commandName"
import { msg_command_type } from "../../utils/types"
import { client } from "../..";
import { error, success } from "../../utils/embed";

export default {
    alias: [commandName(__filename)],
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
        if (!player.playing) return message.reply("再生中ではありません");
        if (args[0]) {
            const volume = parseInt(args[0]);
            if (isNaN(volume)) return message.reply("数字を入力してください");
            if (volume > 100) return message.reply("100が最大です");
            if (volume < 0) return message.reply("0が最小です");

            await player.setVolume(volume);

            message.reply({ embeds: [success(undefined, `音量を**${volume}%**に設定しました`)] });
        } else message.reply({ embeds: [success(undefined, `現在の音量は**${player.volume}%**です`)] });
    }
} as msg_command_type