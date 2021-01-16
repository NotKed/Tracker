import { Client, MessageEmbed, Collection, Message } from 'discord.js';
import logger from '../middlewares/logger';
import * as config from '../../config.json';
import Command from './command'

class DiscordClient extends Client {
    public commands: Collection<any, any>;
    public logger: Function;
    public config: any;

    constructor(options?: object) {
        super(options);
        this.logger = logger;
        this.commands = new Collection();
        this.config = config;

        this.on("ready", () => {
            this.logger(`${this.user?.username} is ready to serve ${this.users?.cache.size} members in ${this.guilds?.cache.size} guilds!`);
            this.loadCommands();
        });

        this.on("message", (message: Message) => {
            if(message.author.bot) return;
            if(!message.content) return;
            if(!message.content.startsWith(this.config.prefix)) return;

            let args: string[] = message.content.split(" ");
            let command: Command = this.commands.get(args[0].toLowerCase());
            args.shift();

            if(command) {
                message.channel.startTyping();
                try {
                    command.run(message, args, this);
                    this.logger(`${message.author.username} just ran ${command.help.name} in ${message.guild?.name}`);
                    message.channel.stopTyping();
                } catch (error) {
                    console.log(error)
                }
            }
        })

        this.login(this.config.token);
    }

    loadCommands() {

    }

}

export default DiscordClient;