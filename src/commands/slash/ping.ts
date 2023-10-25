import { SlashCommandBuilder, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder } from "discord.js";
import commandName from "../../utils/commandName";
import { client } from "../..";

export default {
    data: new SlashCommandBuilder()
        .setName(commandName(__filename))
        .setDescription("Botのpingを返します"),
    async execute(interaction: CommandInteraction & { options: CommandInteractionOptionResolver }) {
        const embed = new EmbedBuilder()
            .setTitle("🏓Pong!")
            .addFields({ name: "ws", value: `${client.ws.ping}ms` })
            .setTimestamp();
        let msgping = 0;
        const itv = setInterval(() => msgping++, 1);
        const msg = await interaction.reply({ embeds: [embed] });
        clearInterval(itv);
        embed.addFields({ name: "message", value: `${msgping}ms` });
        msg?.edit({ embeds: [embed] });
    }
}