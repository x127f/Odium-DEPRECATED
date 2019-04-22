module.exports.run = async function(msg, args) {
	switch (args[0]) {
		case undefined:
			var fields = [];

			client.commands.forEach((e, i) => {
				fields.push({
					name: i,
					value: e.help.description
				});
			});

			message.channel.send({
				embed: {
					color: 0x0000ff,
					title: "Commands:",
					fields: fields
				}
			});
			break;
		default:
			var command = client.commands.get(args[0]);

			if (command == undefined) {
				message.channel.send({
					embed: {
						color: 0x0000ff,
						title: "Hilfe: Unbekannter Command: " + args[0]
					}
				});
			} else {
				message.channel
					.send({
						embed: {
							color: 0x0000ff,
							title: "Hilfe: " + command.help.help,
							description: command.help.description
						}
					})
					.catch(e => {
						console.error(e);
					});
			}
			break;
	}
};

module.exports.help = {
	description: "Display all Commands",
	help: "``help [command]``"
};