import { SlashCommandBuilder, CommandInteraction, CommandInteractionOptionResolver, AutocompleteInteraction, GuildMember } from "discord.js";
import commandName from "../../utils/commandName";
import { client } from "../..";

export default {
    data: new SlashCommandBuilder()
        .setName(commandName(__filename))
        .setDescription("音楽")
        .setDMPermission(false)
        .addSubcommand(c => c
            .setName("play")
            .setDescription("音楽を再生")
            .addStringOption(o => o
                .setName("queue")
                .setDescription("曲名")
                .setRequired(true)
                .setAutocomplete(true)
            )
        )
        .addSubcommand(c => c
            .setName("disconnect")
            .setDescription("ボイスチャンネルから切断")
        ),
    async autocomplete(interaction: AutocompleteInteraction) {
        const focus = interaction.options.getFocused(true);
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === "play") {
            if (focus.name === "queue") {
                const global_player = client.lavalink.getPlayer("global");
                const result = await global_player.search(focus.value, null);
                const tracks = result.tracks.slice(0, 25);
                const data = tracks.map(d => ({ name: d.info.title, value: d.info.uri! }));
                interaction.respond(data);
            }
        }
    },
    async execute(interaction: CommandInteraction & { options: CommandInteractionOptionResolver }) { },
    async play(interaction: CommandInteraction & { options: CommandInteractionOptionResolver }) {
        if (!interaction.guildId || !interaction.guild) return;
        const queue = interaction.options.getString("queue");
        const voiceChannelId = (interaction.member as GuildMember).voice.channelId;
        if (!voiceChannelId) return interaction.reply({ ephemeral: true, content: "ボイスチャンネルに参加してください" });
        const player = client.lavalink.getPlayer(interaction.guildId) || await client.lavalink.createPlayer({
            guildId: interaction.guildId,
            voiceChannelId: voiceChannelId,
            textChannelId: interaction.channelId
        });
        if (player.voiceChannelId !== voiceChannelId) return interaction.reply({ ephemeral: true, content: "別のチャンネルへ接続中です" });
        if (!player.connected) await player.connect();
        if (!queue) return;
        await interaction.deferReply();

        const result = await player.search(queue, interaction.user);

        await player.queue.add(result.loadType === "playlist" ? result.tracks : result.tracks[0]);

        if (result.loadType === "playlist") interaction.followUp(`${result.playlist?.title}から**${result.tracks.length}曲**を追加しました`);
        else interaction.followUp(`${result.tracks[0].info.author}の[**${result.tracks[0].info.title}**](<${result.tracks[0].info.uri}>)を追加しました`);

        await player.play(player.connected ? { paused: false } : undefined);
    },
    async disconnect(interaction: CommandInteraction & { options: CommandInteractionOptionResolver }) {
        if (!interaction.guildId || !interaction.guild) return;
        const voiceChannelId = (interaction.member as GuildMember).voice.channelId;
        if (!voiceChannelId) return interaction.reply({ ephemeral: true, content: "ボイスチャンネルに参加してください" });
        const player = client.lavalink.getPlayer(interaction.guildId);
        if (!player) return interaction.reply({ ephemeral: true, content: "Botがボイスチャンネルにいません" });
        if (player.voiceChannelId !== voiceChannelId) return interaction.reply({ ephemeral: true, content: "別のチャンネルへ接続中です" });
        await player.destroy();
        interaction.reply("切断しました");
    }
}