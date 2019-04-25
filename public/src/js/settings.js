function displaySettings(guild, body) {
	var newchannelorder = [];
	var textchannels = "";
	var lastcategory = "";
	var roles = generateRoles(body.roles);

	$("#sayRoles").html("<option value='none'>- None -</option>" + roles);
	$(".roles").html(roles);

	body.textchannels = body.channels
		.filter(x => x.type != "voice")
		.sort((a, b) => {
			if (a.position > b.position) {
				return 1;
			} else if (a.position < b.position) {
				return -1;
			} else {
				return 0;
			}
		});

	var categorys = body.textchannels.filter(x => x.type == "category");

	newchannelorder.push({
		id: "1",
		name: "No Category",
		type: "category",
		position: 0
	});
	body.textchannels
		.filter(x => x.parentID == null && x.type == "text")
		.forEach(x => {
			newchannelorder.push(x);
		});
	categorys.forEach(c => {
		newchannelorder.push(c);
		body.textchannels
			.filter(t => t.parentID == c.id)
			.forEach(t => newchannelorder.push(t));
	});

	newchannelorder.forEach(x => {
		if (lastcategory != x.name && x.type == "category") {
			textchannels += "</optgroup><optgroup label='" + x.name + "'>";
		} else {
			textchannels +=
				"<option value='" +
				x.id +
				"' id='" +
				x.id +
				"'>" +
				x.name +
				"</option>";
		}
	});

	textchannels += "</optgroup>";

	$(".textchannels").html(textchannels);
	$("#sayChannels").html(
		"<option value='none'>- None -</option>" + textchannels
	);
	$("#channelWelcomeMsg").val(guild.config.extra.welcome.channel);
	$("#channelLeaveMsg").val(guild.config.extra.leave.channel);
	$("#channelCreationEnable")[0].checked =
		guild.config.extra.channelCreation.active;
	$("#channelCreationEnable").on("change", function(e) {
		$.get({
			url:
				"/api/guild/" +
				guild.id +
				"/config/channelCreation/set/active/" +
				Base64.encode($("#channelCreationEnable")[0].checked)
		});
	});
	$("#channelCreationPrefix").on("change", function(e) {
		$.get({
			url:
				"/api/guild/" +
				guild.id +
				"/config/channelCreation/set/prefix/" +
				Base64.encode(this.value)
		});
	});
	$("#welcomeMessageText").val(guild.config.extra.welcome.text);
	$("#welcomeMessageEnable").attr(
		"checked",
		guild.config.extra.welcome.active
	);
	$("#welcomeMessageEnable").on("change", function(e) {
		$.get({
			url:
				"/api/guild/" +
				guild.id +
				"/config/welcome/set/active/" +
				Base64.encode($("#welcomeMessageEnable")[0].checked)
		});
	});
	$("#welcomeMessageText").on("change", function(e) {
		$.get({
			url:
				"/api/guild/" +
				guild.id +
				"/config/welcome/set/text/" +
				Base64.encode(this.value)
		});
	});
	$("#channelWelcomeMsg").on("change", function(e) {
		console.log("updated welcome Channel: " + this.value);
		$.get({
			url:
				"/api/guild/" +
				guild.id +
				"/config/welcome/set/channel/" +
				Base64.encode(this.value)
		});
	});
	$("#leaveMessageText").val(guild.config.extra.leave.text);
	$("#leaveMessageEnable").attr("checked", guild.config.extra.leave.active);
	$("#leaveMessageEnable").on("change", function(e) {
		$.get({
			url:
				"/api/guild/" +
				guild.id +
				"/config/leave/set/active/" +
				Base64.encode($("#leaveMessageEnable")[0].checked)
		});
	});
	$("#leaveMessageText").on("change", function(e) {
		$.get({
			url:
				"/api/guild/" +
				guild.id +
				"/config/leave/set/text/" +
				Base64.encode($("#leaveMessageText").val())
		});
	});
	$("#channelLeaveMsg").on("change", function(e) {
		$.get({
			url:
				"/api/guild/" +
				guild.id +
				"/config/leave/set/channel/" +
				Base64.encode(this.value)
		});
	});
}