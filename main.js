var Discord = require("discord.js");
global.client = new Discord.Client();
var fs = require("fs");
var config = require("./botconfig.json");
var basic = require("./basic");

client.commands = new Discord.Collection();
client.extra = new Discord.Collection();

client.on("ready", () => {
	basic.init();
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm")
		return message.channel.send(
			"Die Befehle dieses Bots sind nicht für Privatnachrichten ausgelegt"
		);

	let prefix = Prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

	client.commands.get(cmd).run(message, args);
});

client.login(config.token);