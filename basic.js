module.exports.init = fs => {
	fs.readdir(__dirname + "/commands/", {}, (err, file) => {
		if (err) console.error(err);

		var jsfile = file.filter(f => f.split(".").pop() === "js");

		jsfile.forEach((f, i) => {
			var props = require(__dirname + "/commands/" + f);
			console.log(f + " loaded!");
			client.commands.set(f.replace(".js", ""), props);
			if (props.init) {
				props.init();
			}
		});
	});

	fs.readdir(__dirname + "/extra/", {}, (err, file) => {
		if (err) console.error(err);

		var jsfile = file.filter(f => f.split(".").pop() === "js");

		jsfile.forEach((f, i) => {
			var props = require(__dirname + "/extra/" + f);
			console.log(f + " loaded!");
			client.extra.set(f.replace(".js", ""), props);
			props.init();
		});
	});

	setInterval(() => {
		jsonfile
			.writeFile(__dirname + "/config.json", config)
			.then(res => {
				console.log("Saved config");
			})
			.catch(error => console.error(error));
	}, 1000 * 10);
};

global.getConfig = function(g) {
	return config.guilds.find(x => x.id == g.id);
};

global.send = function(channel, type, title, text, fields, thumbnail) {
	var color;

	type = type.toLowerCase();

	switch (type) {
		case "help":
			title = "Help: " + title;
			color = 0x8900f2;
			break;
		case "error":
			title = "Error: " + title;
			color = 0xdd2c2c;
			break;
		case "success":
			title = "Success: " + title;
			color = 0x05af10;
			break;
		case "info":
			title = "Info: " + title;
			color = 0x0087ff;
			break;
		default:
			color = 0x707070;
			break;
	}

	var message = new Discord.RichEmbed()
		.setColor(color)
		.setTitle(title)
		.setThumbnail(thumbnail)
		.setColor(color)
		.setDescription(text)
		.setAuthor(`${channel.guild.name}`, channel.guild.iconURL)
		.setFooter(
			client.user.username + " Bot coded by NaCl-y#4400 & Flam3rboy#5979",
			client.user.displayAvatarURL
		);

	if (fields) {
		message.fields = fields;
	}

	return channel.send(message).catch(e => console.log(e));
};
