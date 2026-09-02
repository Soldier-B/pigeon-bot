const { dbconn } = require('./config.json');
const sqlite = require('node:sqlite');

async function getLeader() {
	const leader = (await executeQuery('SELECT * FROM leader LIMIT 1'))[0].value;
	return leader;
}

async function setLeader(leader) {
	await executeQuery(`UPDATE leader SET value = '${leader}' WHERE id = 1`);
}

async function getFacts() {
	const facts = (await executeQuery('SELECT * FROM facts')).map(row => row.value);
	return facts;
}

async function executeQuery(query) {
	const db = new sqlite.DatabaseSync('./data/pigeon-bot.db');

	try {
		const stmt = db.prepare(query);
		return stmt.all();
	}
	catch (err) {
		throw err;
	}
	finally {
		if (db && db.isOpen) db.close();
	}
}

module.exports = { getLeader, setLeader, getFacts };