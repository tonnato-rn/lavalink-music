import commandName from "../../utils/commandName"
import { msg_command_type } from "../../utils/types"
import { client } from "../..";

export default {
    alias: [commandName(__filename), "p"],
    async execute(message, args) {
        if (!message.guildId || !message.guild) return;
        const queue = args.join(" ");
        const voiceChannelId = message.member?.voice.channelId;
        if (!voiceChannelId) return message.reply("ボイスチャンネルに参加してください");
        const player = client.lavalink.getPlayer(message.guildId) || await client.lavalink.createPlayer({
            guildId: message.guildId,
            voiceChannelId: voiceChannelId,
            textChannelId: message.channelId
        });
        if (player.voiceChannelId !== voiceChannelId) return message.reply("別のチャンネルへ接続中です");
        if (!player.connected) await player.connect();
        if (!queue) return;

        const result = await player.search(queue, message.author);

        await player.queue.add(result.loadType === "playlist" ? result.tracks : result.tracks[0]);

        if (result.loadType === "playlist") message.reply(`${result.playlist?.title}から**${result.tracks.length}曲**を追加しました`);
        else message.reply(`${result.tracks[0].info.author}の[**${result.tracks[0].info.title}**](<${result.tracks[0].info.uri}>)を追加しました`);

        if (!player.playing) await player.play(player.connected ? { paused: false } : undefined);
    }
} as msg_command_type