import { readdirSync } from "fs";
import { resolve } from "path";
import { msg_command_type } from "./types";

const commands: { [key:string]: string } = {};

readdirSync(resolve(__dirname, "../commands/message")).forEach(async filename => {
    const command: msg_command_type = require(`../commands/message/${filename}`).default;
    command.alias.forEach(alias => commands[alias] = filename);
});

export default commands;