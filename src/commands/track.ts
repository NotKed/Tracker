import { Message, MessageEmbed } from 'discord.js';
import Client from '../components/client';
import Command from '../components/command';
import * as fortnite from 'fortnite';

class Track extends Command {
    constructor(client: Client) {
        super(client, {
            name: "track",
            usage: "track <username> <platform>"
        });
    } 

    run = async (message: Message, args: string[], client: Client) => {
        const fortniteClient = new fortnite(client.config.fortniteAPI)
        let embed: MessageEmbed = new MessageEmbed();
        if(args.length < 2) return message.author.send(this.help.usage);
        let username = args[0], platform = args[1];

        let data = await fortniteClient.getInfo(username, platform);
        console.log(data);
    }
}

export default Track;