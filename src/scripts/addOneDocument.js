const { connect, getTimestampNow } = require('../database.js')
const db = connect()

const USERS = 'users'

addOne();



async function addOne() {
	console.log('Add a new document...');
	const object = {
		name: 'Hermione Granger',
		email: 'hermione@email.com',
		lastOnline: getTimestampNow()
	}

	const docRef = await db.collection(USERS).add(object)
	console.log('Added document with the id ' + docRef.id);
}
