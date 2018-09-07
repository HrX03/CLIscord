const Discord = require('discord.js'),
      blessed = require('blessed');

let client  = new Discord.Client(),
	config  = require("./config.json"),
	guild   = "",
	channel = "",
	switchVar = 1;

let screen = blessed.screen({
    smartCSR: true,
	fullUnicode: true
});

screen.title = "CLIscord";

info = blessed.box({
	width: '100%',
	height: 1
});

box = blessed.log({
	top: 1,
	left: 0,
	width: '100%',
	height: '100%-3',
	border: {
		type: 'line',
		bg: 'black'
	},
	style: {
		bg: 'black',
		fg: 'white'
	},
	alwaysScroll: true,
	keys: true,
	scrollable: true,
	scrollbar: {
		style: {
			bg: 'white'
		},
	}
});

input = blessed.textbox({
	top: '100%-3',
	left: 0,
	width: '100%',
	height: 3,
	border: {
		type: 'line',
		fg: 'white',
		bg: 'black'
	},
	style: {
		bg: 'black',
		fg: 'white',
		focus: {
			bg: 'white',
			fg: 'black'
		},
	},
	keys: true,
	vi: true,
	alwaysScroll: true,
	inputOnFocus: true,
	scrollable: true,
	scrollbar: {
		style: {
			bg: 'white'
		},
	}
});

guildList = blessed.list({
	border: {
		type: 'line',
		bg: 'white',
		fg: 'black'
	},
	style: {
		bg: 'white',
		fg: 'black'
	},
	width: '50%',
	height: '100%',
	interactive: true,
	items: [],
	keys: true,
	alwaysScroll: true,
	scrollable: true,
	scrollbar: {
		style: {
			bg: 'black'
		},
	}
});

channelList = blessed.list({
	border: {
		type: 'line',
		bg: 'white',
		fg: 'black'
	},
	style: {
		bg: 'white',
		fg: 'black'
	},
	width: '50%',
	height: '100%',
	left: '50%',
	interactive: true,
	items: [],
	keys: true,
	alwaysScroll: true,
	scrollable: true,
	scrollbar: {
		style: {
			bg: 'black'
		},
	}
});

client.on('ready', ready => {
	let guilds = client.guilds.map(g => g.name)
	guild = guilds[0]
	
	guildList.setItems(guilds);
	
	info.setContent(`${guild}|#${channel}`)
	
	box.setContent(`Online as ${client.user.username}#${client.user.discriminator}\n`);
	screen.render();
});

client.on("message", message => {
	if(message.channel.type !== "text" && message.guild.name === guild && message.channel.name === channel) {
		let user = ``;
		if(message.author.username === client.user.username && message.author.discriminator === client.user.discriminator) {
			user = "You";
		} else {
			user = `@${message.author.username}#${message.author.discriminator}`;
		}
		box.log(`${message.guild.name}|#${message.channel.name} - ${user}: ${message.content}`);
		screen.render();
	} else return;
});

input.on('submit', function(data) {
	client.guilds.find(g => g.name === guild).channels.find(c => c.name === channel).send(data);
	input.clearValue();
	screen.render();
	input.focus();
});

screen.key(['C-s'], function(ch, key) {
	if(switchVar === 0) {
		box.focus();
		screen.render();
		switchVar = 1;
	} else if (switchVar === 1) {
		input.focus();
		screen.render();
		switchVar = 0;
	}
});

input.key(['C-s'], function(ch, key) {
	if(switchVar === 0) {
		box.focus();
		screen.render();
		switchVar = 1;
	} else if (switchVar === 1) {
		input.focus();
		screen.render();
		switchVar = 0;
	}
});

screen.key(['C-n'], function(ch, key) {
	if(guildList.hidden === true && channelList.hidden === true) {
		guildList.hidden = false;
		channelList.hidden = false;
		guildList.focus();
		screen.render();
	} else if (guildList.hidden === false && channelList.hidden === false) {
		if(guild === "" && channel === "") {
			guildList.hidden = true;
			channelList.hidden = true;
			input.focus();
			screen.render();
		} else return;
	}
});

input.key(['C-n'], function(ch, key) {
	if(guildList.hidden === true && channelList.hidden === true) {
		guildList.hidden = false;
		channelList.hidden = false;
		guildList.focus();
		screen.render();
	} else if (guildList.hidden === false && channelList.hidden === false) {
		if(guild === "" && channel === "") {
			guildList.hidden = true;
			channelList.hidden = true;
			input.focus();
			screen.render();
		} else return;
	}
});

screen.key(['C-c'], function(ch, key) {
	return process.exit(0);
});

input.key(['C-c'], function(ch, key) {
	return process.exit(0);
});

input.key(['enter', 'return'], function(ch, key) {
	input.submit();
});

guildList.on("select", function(selection) {
	guild = selection.content
	channels = client.guilds.find(g => g.name === guild).channels.filter(c => c.type === 'text').map(c => c.name)
	channelList.setItems(channels);
	info.setContent(`${guild}|#${channel}`)
	channelList.focus();
	screen.render();
});

channelList.on("select", function(selection) {
	channel = selection.content
	info.setContent(`${guild}|#${channel}`)
	guildList.hidden = true;
	channelList.hidden = true;
	input.focus();
	screen.render();
});

screen.append(info);
screen.append(box);
screen.append(input);
screen.append(guildList);
screen.append(channelList);

guildList.focus();
screen.render();

client.login(config.token);
