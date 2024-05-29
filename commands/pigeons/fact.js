const db = require('../../db');
const crypto = require('crypto');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fact')
		.setDescription('Get a random pigeon fact.'),
	async execute(interaction) {
		const facts = await db.getFacts();
		const i = crypto.randomInt(facts.length);
		await interaction.reply(facts[i]);
	}
}