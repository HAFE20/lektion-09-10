const admin = require("firebase-admin");
const Timestamp = admin.firestore.Timestamp

const serviceAccount = require("./secrets/firebase-key.json");



function connect() {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
	const db = admin.firestore()
	return db
}

function getTimestampNow() {
	const now = Math.round(Date.now() / 1000)
	return new Timestamp(now, 0)
}

module.exports = { connect, getTimestampNow }
