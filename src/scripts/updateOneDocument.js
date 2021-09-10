const { connect, getTimestampNow } = require('../database.js')
const db = connect()

const USERS = 'users'

updateOne();


async function updateOne(id) {
	console.log('Update a document...');
	const docId = id || 'Ke6o3MuAH24VWFXjwK5c'

	const updates = {
		// email: 'hagel.harry@hotmail.com',
		// lastOnline: getTimestampNow(),
		name: 'Harry Persson'
	}

	const settings = { merge: true }
	await db.collection(USERS).doc(docId).set(updates, settings)
}
