const crypto = require('crypto');
const { SlashCommandBuilder } = require('discord.js');
const { roster } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lineup')
		.setDescription('Pick a random Boomin\' Birds lineup.'),
	async execute(interaction) {
		// get current member data
		const members = await interaction.guild.members.fetch({ user: roster });

		// map from user id to name
		const lineup = roster.map(id => {
			const member = members.get(id);
			return member.nickname ?? member.user.globalName;
		});

		if (global.dt) {
			global.dt = false;
			lineup.pop();
			lineup.pop();
		}

		// remove a person until we have 3 left
		while (lineup.length > 3) {
			const i = crypto.randomInt(lineup.length);
			lineup.splice(i, 1);
		}
		// sort names
		lineup.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
		// spit out lineup
		await interaction.reply(`The roster is ${lineup[0]}, ${lineup[1]} and ${lineup[2]}.`);
	}
}