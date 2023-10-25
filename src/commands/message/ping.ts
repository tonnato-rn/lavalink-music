import { EmbedBuilder } from "discord.js";
import commandName from "../../utils/commandName"
import { msg_command_type } from "../../utils/types"
import { client } from "../..";

export default {
    alias: [commandName(__filename)],
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle("🏓Pong!")
            .addFields({ name: "ws", value: `${client.ws.ping}ms` })
            .setTimestamp();
        let msgping = 0;
        const itv = setInterval(() => msgping++, 1);
        const msg = await message.reply({ embeds: [embed] });
        clearInterval(itv);
        embed.addFields({ name: "message", value: `${msgping}ms` });
        msg?.edit({ embeds: [embed] });
    }
} as msg_command_type