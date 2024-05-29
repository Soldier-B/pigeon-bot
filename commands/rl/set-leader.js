const db = require('../../db');
const { SlashCommandBuilder } = require('discord.js');
const { froggyyId } = require('../../config.json');
const { soldierId } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leading')
		.setDescription('Tell me you\'re leading the party.'),
	async execute(interaction) {
		// make sure this command is only usable for me and frog
		if (interaction.user.id != froggyyId && interaction.user.id != soldierId) {
			await interaction.reply('This command can only be used by Froggyy or Soldier-B.');
			return;
		}

		// read file to see who's turn it is to lead
		const leader = await db.getLeader();

		// check to make sure user is current leader
		if (interaction.user.id === leader) {
			const next = [froggyyId, soldierId].filter(id => id !== interaction.user.id)[0];
			const member = await interaction.guild.members.fetch(next);
			// update leader file
			await db.setLeader(next);
			// reply
			await interaction.reply(`**${member.nickname ?? member.user.globalName}** has been set as the next leader.`);
		}
		else
			await interaction.reply('You\'re not the current leader.');
	}
}