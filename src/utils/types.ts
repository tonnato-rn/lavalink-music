import { CommandInteraction, Message, SlashCommandBuilder } from "discord.js"

export type command_type = {
    data: SlashCommandBuilder,
    execute(interaction: CommandInteraction): any
}

export type msg_command_type = {
    alias: string[],
    execute(message: Message, args: string[]): any
}