const { dbconn } = require('./config.json');
const mariadb = require('mariadb');

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
	const pool = mariadb.createPool(dbconn);
	let conn, rows;

	try {
		conn = await pool.getConnection(dbconn);
		rows = await conn.query(query);
	}
	catch (err) {
		throw err;
	}
	finally {
		if (conn) conn.end();
		if (pool) pool.end();
	}

	return rows;
}

module.exports = { getLeader, setLeader, getFacts };