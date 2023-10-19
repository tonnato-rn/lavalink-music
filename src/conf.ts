import { config } from "dotenv"

config();
export default {
    token: process.env.TOKEN || "",
    prefix: process.env.PREFIX || "",
    lavalink: {
        host: process.env.LAVALINK_HOST || "",
        port: process.env.LAVALINK_PORT || "2333",
        password: process.env.LAVALINK_PASSWORD || ""
    }
}