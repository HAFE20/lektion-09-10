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

router.get('/:id', async (req, res) => {
	const maybeUser = await getOne(req.params.id)
	res.send(maybeUser)  // antingen null eller ett user-objekt
})

function isUserObject(maybe) {
	if( (typeof maybe) !== 'object' ) {
		return false
	}
	// Body måste innehålla: lastOnline, email och name
	let keys = Object.keys(maybe)  // ['name', 'email' ..]
	if( !keys.includes('name') || !keys.includes('email') || !keys.includes('lastOnline') ) {
		return false
	}

	return true
}
router.put('/:id', async (req, res) => {
	const maybeBody = req.body
	// kontrollera att body är okej
	if( !isUserObject(maybeBody) ) {
		res.status(400).send('Must send a user object.')
		return
	}

	// skicka ändringar till databasen
	await updateOne(req.params.id, maybeBody)
	res.sendStatus(200)
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
async function getOne(id) {
	const docRef = db.collection(USERS).doc(id)
	const docSnapshot = await docRef.get()
	if( docSnapshot.exists ) {
		return await docSnapshot.data()
	} else {
		return null
	}
}
async function updateOne(id, object) {
	const docRef = db.collection(USERS).doc(id)
	docRef.set(object)
}



module.exports = router
