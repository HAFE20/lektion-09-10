const { connect, getTimestampNow } = require('../database.js')
const db = connect()

const USERS = 'users'

deleteOne();


async function deleteOne(id) {
	console.log('Deleting a document...');
	const docId = id || 'IgGcFb3glpaM27C7DYK6'

	const docRef = db.collection(USERS).doc(docId)
	const docSnapshot = await docRef.get()
	console.log('Document exists? ', docSnapshot.exists);
	const result = await docRef.delete()
}
