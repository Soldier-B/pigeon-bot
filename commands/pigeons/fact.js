const crypto = require('crypto');

const { SlashCommandBuilder } = require('discord.js');
const { facts } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fact')
		.setDescription('Get a random pigeon fact.'),
	async execute(interaction) {
		const i = crypto.randomInt(facts.length);
		await interaction.reply(facts[i]);
	}
}