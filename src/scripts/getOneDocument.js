const { connect } = require('../database.js')
const db = connect()

const USERS = 'users'

getOne();


// Hämta "Hagelharry" från databasen
async function getOne(id) {
	console.log('Looking for Hagelharry...');
	const docId = id || 'Ke6o3MuAH24VWFXjwK5c'

	const docSnapshot = await db.collection(USERS).doc(docId).get()

	if( !docSnapshot.exists ) {
		console.log('Could not find him!');
		return
	}
	const data = await docSnapshot.data()
	console.log('Found: ', data);
	return data
}


module.exports = getOne
