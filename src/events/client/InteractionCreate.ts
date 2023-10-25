import { CommandInteraction, CommandInteractionOptionResolver, Events, Interaction } from "discord.js";
import { command_type } from "../../utils/types";
import { error } from "../../utils/log";

export const type = Events.InteractionCreate;
export default async function (interaction: Interaction) {
    if (interaction.isCommand()) {
        try {
            const subcommand = (interaction.options as CommandInteractionOptionResolver).getSubcommand();
            (require(`../../commands/slash/${interaction.commandName}`).default)[subcommand](interaction);
        } catch (err) {
            (require(`../../commands/slash/${interaction.commandName}`).default as command_type).execute(interaction);
        }
    }
    if (interaction.isAutocomplete()) {
        (require(`../../commands/slash/${interaction.commandName}`).default).autocomplete(interaction);
    }
}