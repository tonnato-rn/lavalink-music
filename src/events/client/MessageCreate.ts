import { Events, Message } from "discord.js";
import conf from "../../conf";
import msgcommands from "../../utils/msgcommands";
import { msg_command_type } from "../../utils/types";

export const type = Events.MessageCreate;
export default async function (message: Message) {
    if (message.author.bot) return;

    if (message.content.startsWith(conf.prefix)) {
        const split = message.content.split(" ");
        const args = message.content.split(" ");
        args.shift();
        const commandName = split[0].replace(conf.prefix, "");
        const fileName = msgcommands[commandName];
        if (fileName) (require(`../../commands/message/${fileName}`).default as msg_command_type).execute(message, args);
    }
}