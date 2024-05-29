const db = require('../../db');
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leader')
		.setDescription('Who\'s turn is it to lead the party?'),
	async execute(interaction) {
		// read file to see who's turn it is to lead
		const id = await db.getLeader();
		// get current member data
		const member = await interaction.guild.members.fetch(id);
		// reply
		await interaction.reply(`The next leader is **${member.nickname ?? member.user.globalName}**.`);
	}
}