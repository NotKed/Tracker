import client from './client'

interface Command {
    client: client,
    config: any,
    help: any,
    run: Function
}

class Command {
    constructor(client: client, {
        name = "",
        description = "No description provided.",
        category = "Other",
        usage = "No usage provided.",
        enabled = true,
        guildOnly = false,
        aliases = new Array(),
        permLevel = 0
    }) {
        this.client = client;
        this.config = { enabled, guildOnly, aliases, permLevel },
        this.help = { name, description, category, usage }
    }
}

export default Command;