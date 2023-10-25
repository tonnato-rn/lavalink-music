import commandName from "../../utils/commandName"
import { msg_command_type } from "../../utils/types"
import { client } from "../..";
import { error } from "../../utils/embed";

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
        const time = args[0]?.match(/([0-9]+[d,h,m,s])/g);
        if (!time) return message.reply({ embeds: [error(undefined, "正しく時間を指定してください\n例:`30s`")] });
        let ms = 0;
        for (const t of time) {
            const unit = t[t.length - 1];
            const amount = Number(t.slice(0, -1));
            if (unit === 'd') ms += amount * 24 * 60 * 60 * 1000;
            else if (unit === 'h') ms += amount * 60 * 60 * 1000;
            else if (unit === 'm') ms += amount * 60 * 1000;
            else if (unit === 's') ms += amount * 1000;
        }
        await player.seek(ms);
        message.reply(`${args[0]}へ飛ばしました`);
    }
} as msg_command_type