const { connect, getTimestampNow } = require('../database.js')
const db = connect()

const USERS = 'users'

const data = [
	{
		email: 'goran@gmail.com', name: 'Göran Holm'
	},
	{
		email: 'hagel.harry@hotmail.com', name: 'Harry Persson'
	},
	{
		email: 'david.andersson@zocom.se', name: 'David Andersson'
	}
]

populate();

// Fill the collection with test data
async function populate() {
	data.forEach(object => {
		let newObject = {
			...object,
			lastOnline: getTimestampNow()
		}
		db.collection(USERS).add(newObject)
	})
}
