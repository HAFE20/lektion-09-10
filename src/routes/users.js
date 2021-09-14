const express = require('express')
const router = express.Router()


const database = require('../database.js')
const connect = database.connect
const db = connect()
const USERS = 'users'


//          /users
router.get('/', async (req, res) => {
	let array = await getAll()
	res.send(array)
})


async function getAll() {
	const usersRef = db.collection(USERS)
	const usersSnapshot = await usersRef.get()

	if( usersSnapshot.empty ) {
		return []
	}

	const array = []
	await usersSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})
	return array
}

module.exports = router
