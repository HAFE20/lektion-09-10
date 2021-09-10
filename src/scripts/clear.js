const { connect, getTimestampNow } = require('../database.js')
const db = connect()

const USERS = 'users'

clear();

async function clear() {
	const usersRef = db.collection(USERS)
	const usersSnapshot = await usersRef.get()

	if( usersSnapshot.empty ) {
		return
	}

	usersSnapshot.forEach(docRef => {
		usersRef.doc(docRef.id).delete()
		// Vi behöver inte await - inget att vänta på
	})
}
